import React, { useState } from "react";
import styled from "react-emotion";
import { storiesOf } from "@storybook/react";

import DropTarget from "../components/drop-target";

function Area() {
  const DropTargetContent = styled.div`
    align-content: center;
    align-items: center;
    background: #ededed;
    border-radius: 5px;
    box-sizing: border-box;
    display: grid;
    grid-gap: 20px;
    height: 100px;
    justify-content: center;
    justify-items: center;
    padding: 20px;

    &.hovered {
      border: 3px dashed #333;
    }
  `;

  const FileList = styled.div`
    margin-top: 20px;

    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0 -5px;
      padding: 0;
    }

    li {
      background: #ededed;
      border-radius: 5px;
      border: 1px solid #ccc;
      display: inline;
      margin: 5px;
      padding: 5px;
    }
  `;

  const [numHovered, setNumHovered] = useState(0);
  const [filenames, setFilenames] = useState([]);

  const onDragEnter = e => {
    setNumHovered(e.dataTransfer.items.length);
  };

  const onDragLeave = () => {
    setNumHovered(0);
  };

  const onDrop = e => {
    setNumHovered(0);

    const collator = new Intl.Collator("en-US", {
      numeric: true,
      sensitifity: "base"
    });

    const allFilenames = filenames
      .concat(
        Array.from(e.dataTransfer.files)
          .map(f => f.name)
          .filter(fn => !filenames.includes(fn))
      )
      .sort(collator.compare);

    setFilenames(allFilenames);
  };

  return (
    <React.Fragment>
      <DropTarget
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {numHovered === 0 && (
          <DropTargetContent className="unhovered">
            <span>Drag and drop files here</span>
          </DropTargetContent>
        )}
        {numHovered !== 0 && (
          <DropTargetContent className="hovered">
            <span>Drop to add {numHovered} files</span>
          </DropTargetContent>
        )}
      </DropTarget>
      {filenames.length !== 0 && (
        <FileList>
          Files added:
          <ul>
            {filenames.map(fn => (
              <li key={fn}>{fn}</li>
            ))}
          </ul>
        </FileList>
      )}
    </React.Fragment>
  );
}

function FullPageModal() {
  const StyledHeader = styled.header`
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
  `;

  const StyledMain = styled.main`
    column-count: 2;
    margin: 20px 0;

    p:first-child {
      margin-top: 0;
    }

    p:last-child {
      margin-bottom: 0;
    }
  `;

  const ModalWrapper = styled.div`
    visibility: hidden;

    &.visible {
      background: rgba(0, 0, 0, 0.75);
      visibility: visible;

      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  `;

  const Modal = styled.div`
    &.visible {
      background: #fff;
      display: grid;
      grid-template-rows: min-content;

      position: absolute;
      top: 10vh;
      right: 10vh;
      bottom: 10vh;
      left: 10vh;
    }
  `;

  const ModalTitle = styled.div`
    padding: 10px;
    font-weight: bold;
    border-bottom: 1px solid #000;
  `;

  const ModalBody = styled.div`
    overflow: auto;
    padding: 10px;
  `;

  const FileTable = styled.table`
    text-align: left;
    width: 100%;
  `;

  const [modalVisible, setModalVisible] = useState(false);
  const [files, setFiles] = useState([]);

  return (
    <DropTarget
      onDragEnter={() => setModalVisible(true)}
      onDragLeave={() => setModalVisible(false)}
      onDrop={e => setFiles(e.dataTransfer.files)}
    >
      <article>
        <StyledHeader>Drag and drop anywhere on this page</StyledHeader>
        <StyledMain>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh
            tortor id aliquet lectus proin nibh nisl. Ut tristique et egestas
            quis ipsum suspendisse ultrices. Enim praesent elementum facilisis
            leo vel fringilla est ullamcorper eget. Praesent semper feugiat nibh
            sed pulvinar proin gravida. Ornare arcu dui vivamus arcu felis
            bibendum ut tristique. Commodo quis imperdiet massa tincidunt nunc
            pulvinar sapien et. Lorem donec massa sapien faucibus. Magnis dis
            parturient montes nascetur ridiculus mus mauris. Enim ut sem viverra
            aliquet eget sit amet tellus. Eget felis eget nunc lobortis mattis
            aliquam faucibus. Quam vulputate dignissim suspendisse in est.
            Dignissim sodales ut eu sem integer.
          </p>

          <p>
            Morbi tristique senectus et netus et malesuada fames ac turpis.
            Egestas tellus rutrum tellus pellentesque eu tincidunt tortor
            aliquam. Felis donec et odio pellentesque diam volutpat commodo.
            Aliquet lectus proin nibh nisl condimentum id venenatis a. Vel
            pharetra vel turpis nunc eget. Posuere sollicitudin aliquam ultrices
            sagittis. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames. Nunc sed augue lacus viverra vitae congue. Volutpat
            maecenas volutpat blandit aliquam etiam erat. Orci ac auctor augue
            mauris. Tortor at risus viverra adipiscing at in tellus. Scelerisque
            viverra mauris in aliquam sem fringilla. Blandit aliquam etiam erat
            velit scelerisque in dictum non consectetur. Facilisis magna etiam
            tempor orci. Sodales neque sodales ut etiam sit amet nisl purus in.
          </p>

          <p>
            At volutpat diam ut venenatis. Hac habitasse platea dictumst quisque
            sagittis purus. Ut ornare lectus sit amet est placerat in egestas.
            Eget velit aliquet sagittis id consectetur purus ut faucibus. Tempor
            id eu nisl nunc mi. Potenti nullam ac tortor vitae. Sapien et ligula
            ullamcorper malesuada. Viverra justo nec ultrices dui sapien. Sit
            amet dictum sit amet justo donec enim. Arcu bibendum at varius vel
            pharetra vel turpis. Mauris pharetra et ultrices neque ornare.
            Faucibus pulvinar elementum integer enim neque volutpat ac. Accumsan
            tortor posuere ac ut consequat. Adipiscing commodo elit at imperdiet
            dui. Congue eu consequat ac felis donec et. Maecenas sed enim ut sem
            viverra. Enim sit amet venenatis urna. Nisi scelerisque eu ultrices
            vitae auctor eu augue ut. Sem et tortor consequat id.
          </p>

          <p>
            Arcu cursus vitae congue mauris rhoncus aenean vel elit. Pharetra
            magna ac placerat vestibulum lectus. Elit pellentesque habitant
            morbi tristique senectus et netus et. Auctor urna nunc id cursus
            metus. Vitae auctor eu augue ut lectus arcu. Mi in nulla posuere
            sollicitudin aliquam ultrices. Pellentesque diam volutpat commodo
            sed egestas egestas fringilla. Vitae elementum curabitur vitae nunc
            sed. Posuere morbi leo urna molestie at elementum. Et tortor
            consequat id porta nibh venenatis cras sed. Enim sit amet venenatis
            urna cursus eget nunc scelerisque viverra. Parturient montes
            nascetur ridiculus mus mauris vitae ultricies leo integer. Hac
            habitasse platea dictumst quisque sagittis. Egestas fringilla
            phasellus faucibus scelerisque eleifend donec pretium. Libero enim
            sed faucibus turpis. Eget nullam non nisi est. Praesent elementum
            facilisis leo vel fringilla est ullamcorper. Duis tristique
            sollicitudin nibh sit amet commodo nulla facilisi. Adipiscing enim
            eu turpis egestas pretium aenean pharetra. Dis parturient montes
            nascetur ridiculus mus mauris.
          </p>

          <p>
            Nunc congue nisi vitae suscipit tellus mauris. Sit amet volutpat
            consequat mauris nunc. Non blandit massa enim nec dui nunc mattis
            enim. Lectus mauris ultrices eros in cursus. Euismod nisi porta
            lorem mollis. Massa placerat duis ultricies lacus sed turpis
            tincidunt id. Eget aliquet nibh praesent tristique magna sit amet
            purus gravida. Nibh nisl condimentum id venenatis a condimentum.
            Aenean et tortor at risus viverra adipiscing at in tellus. Praesent
            tristique magna sit amet. Porttitor rhoncus dolor purus non enim
            praesent elementum facilisis. Neque convallis a cras semper auctor
            neque vitae tempus quam. Molestie a iaculis at erat pellentesque
            adipiscing commodo. Sodales ut etiam sit amet nisl purus in mollis.
            In ornare quam viverra orci sagittis eu. Volutpat est velit egestas
            dui. Cras adipiscing enim eu turpis egestas pretium. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam quis.
          </p>
        </StyledMain>
      </article>
      <ModalWrapper
        className={modalVisible ? "visible" : "hidden"}
        onClick={() => {
          setFiles([]);
          setModalVisible(false);
        }}
      >
        <Modal
          className={modalVisible ? "visible" : "hidden"}
          onClick={e => e.stopPropagation()}
        >
          <ModalTitle>File information</ModalTitle>
          {files.length === 0 && (
            <ModalBody>Drop files for more information...</ModalBody>
          )}
          {files.length !== 0 && (
            <ModalBody>
              <FileTable>
                <thead>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Last modified</th>
                </thead>
                <tbody>
                  {Array.from(files).map(f => (
                    <tr key={f}>
                      <td>{f.name}</td>
                      <td>{f.type}</td>
                      <td>{(f.size / 1e6).toPrecision(6)} MB</td>
                      <td>
                        {new Date(f.lastModified).toLocaleDateString("en-US")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </FileTable>
            </ModalBody>
          )}
        </Modal>
      </ModalWrapper>
    </DropTarget>
  );
}

const stories = storiesOf("DropTarget", module);
stories.add("Area", () => <Area />);
stories.add("Full page modal", () => <FullPageModal />);
