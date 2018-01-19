import {newNotebook} from './state-prototypes'

const jsmdValidCellTypes = ['meta', 'md', 'js', 'raw', 'dom', 'resource']

const jsmdValidCellSettings = [
  'collapseEditViewInput',
  'collapseEditViewOutput',
  'collapsePresentationViewInput',
  'collapsePresentationViewOutput'
]


function parseJsmd(jsmd){
  const parseWarnings = []
  let cells = jsmd
    .split('\n%%')
    .map( (str,cellNum) => {
      //if this is the first cell, and it starts with "%%", drop those chars
      if (cellNum===0 && str.substring(0,2)=='%%'){
        str = str.substring(2)
      }
      return str
    })
    .map(str=>str.trim())
    .filter(str=>str!=='')
    .map( (str,i) => {
      let firstLineBreak = str.indexOf('\n')
      let firstLine = str.substring(0,firstLineBreak).trim()
      let firstLineFirstSpace = firstLine.indexOf(' ')
      let cellType, settings, content
      
      if (firstLineFirstSpace===-1){
        // if there is NO space on the first line (after trimming), there are no cell settings
        cellType = firstLine.toLowerCase()
      } else {
        // if there is a space on the first line (after trimming), there must be cell settings
        cellType = firstLine.substring(0,firstLineFirstSpace).toLowerCase()
        //make sure the cell settings parse as JSON
        try {
          settings = JSON.parse(firstLine.substring(firstLineFirstSpace+1))
        } catch(e) {
          parseWarnings.push(
            {parseError: 'failed to parse cell settings, using defaults',
              details: firstLine,
              jsError: e.name + ': ' + e.message
            }
          )
        }
      }
      //if settings exist and parsed ok, make sure that only valid cell settings are kept
      if (settings) {
        let settingsOut = {}
        for (const key in settings){
          if (jsmdValidCellSettings.indexOf(key)>-1){
            settingsOut[key] = settings[key]
          } else {
            parseWarnings.push(
              {parseError: 'invalid cell setting',
                details: key}
            )
          }
        } 
        settings = settingsOut ? settingsOut : undefined
      }
      // if the cell type is not valid, set it to js
      if (jsmdValidCellTypes.indexOf(cellType)===-1){
        parseWarnings.push(
          {parseError: 'invalid cell type, converted to js cell',
            details: `cellType: ${cellType} cellNum:${i} raw string: ${str}`}
        )
        cellType = 'js'
      }

      content = str.substring(firstLineBreak+1).trim()
      if (cellType ==='meta'){
        try {
          content = JSON.parse(content)
        } catch (e) {
          parseWarnings.push(
            {parseError: 'Failed to parse notebook settings from meta cell. Using default settings.',
              details: content,
              jsError: e.name + ': ' + e.message
            }
          )
        }
      }
      return { cellType: cellType,
        settings: settings,
        content: content
      }
    })
  // console.log(parseWarnings)
  return {cells, parseWarnings}
}

const cellTypeToJsmdMap = new Map([
  ['javascript','js'],
  ['markdown','md'],
  ['external dependencies','resource'],
  ['dom','dom'],
  ['raw','raw'],
])

const jsmdValidNotebookSettings = [
  'title',
  'viewMode'
]

function stringifyStateToJsmd(state){
  let defaultState = newNotebook()
  let defaultCell = defaultState.cells[0]
  // serialize cells. most of the work here is seeing if cell properties
  // are in the jsmd valid list, and seeing if they are non-default
  let cellsStr = state.cells.map(cell=>{
    let jsmdCellType = cellTypeToJsmdMap.get(cell.cellType)
    let cellSettings = {}
    for (let setting of jsmdValidCellSettings){
      if (cell.hasOwnProperty(setting)
        && cell[setting]!==defaultCell[setting]){
        cellSettings[setting] = cell[setting]
      }
    }
    let cellSettingsStr = JSON.stringify(cellSettings)
    cellSettingsStr = cellSettingsStr==='{}' ? '' : ' '+cellSettingsStr
    return `%% ${jsmdCellType}${cellSettingsStr}
${cell.content}`
  }).join('\n')

  // serialize global settings. as above, check if state properties
  // are in the jsmd valid list, and check if they are non-default
  let metaSettings = {}
  for (let setting of jsmdValidNotebookSettings){
    if (state.hasOwnProperty(setting)
      && state[setting]!==defaultState[setting]){
      metaSettings[setting] = state[setting]
    }
  }
  let metaSettingsStr = JSON.stringify(metaSettings,undefined,2)
  metaSettingsStr = metaSettingsStr==='{}' ? '' : `%% meta
${metaSettingsStr}
`
  return metaSettingsStr+cellsStr
}


function exportJsmdBundle(state){
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Javascript Notebook</title>

<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i" rel="stylesheet">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
rel="stylesheet">

<link rel="stylesheet" type="text/css" href="https://mozilla.github.io/javascript-notebook/dist/react-table.css">
<link rel="stylesheet" type="text/css" href="https://mozilla.github.io/javascript-notebook/dist/eclipse.css">
<link rel="stylesheet" type="text/css" href="https://mozilla.github.io/javascript-notebook/dist/codemirror.css">
<link rel="stylesheet" type="text/css" href="https://mozilla.github.io/javascript-notebook/dist/page.css">

</head>
<body>

<script id="jsmd" type="text/jsmd">
${stringifyStateToJsmd(state)}
</script>

<div id='page'></div>
<script src='https://mozilla.github.io/javascript-notebook/dist/ailerusApp_v0.0.1.js'></script>
</body>
</html>`
}

export {
  parseJsmd,
  jsmdValidCellTypes,
  jsmdValidCellSettings,
  stringifyStateToJsmd,
  exportJsmdBundle
}