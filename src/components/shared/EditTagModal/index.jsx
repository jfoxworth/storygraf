import React, { useState, useEffect } from "react";
import FormInput from "../../shared/Forms/FormInput";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Tag from "../Tag";
import { BsFillPlusCircleFill, BsTrash } from "react-icons/bs";
import Steps from "../Steps";
import { updateTag } from "../utils/api/tag";
import {
  createCumulative,
  updateCumulative,
  deleteCumulative,
} from "../utils/api/cumulative";

const EditTagModal = (props) => {
  const [step, setStep] = useState(0);
  const steps = ["Name and color", "Description", "Cumulatives"];

  const [cumulatives, setCumulatives] = useState(
    props.tag.data.cumulatives || []
  );
  const addCumulative = (e) => {
    const temp = {
      data: {
        parent_tag_id: props.tag.id,
        text: "New Cumulative",
        color: "#CCCCCC",
        geoData: {},
        numData: {},
        value: 0,
      },
    };
    createCumulative(temp).then((newItem) => {
      console.log(newItem);
      setCumulatives([...cumulatives, newItem]);
    });
  };
  const deleteCumulative = (ci) => {
    deleteCumulative(ci).then(() => {});
  };

  const handleCumulativeTextChange = (index) => (e) => {
    const temp = [...cumulatives];
    temp[index].text = e.target.value;
    temp[index].changed = true;
    setCumulatives(temp);
  };

  const handleChangeCumColor = (index) => (e) => {
    const temp = [...cumulatives];
    temp[index].color = e.target.value;
    setCumulatives(temp);
  };

  let [tagName, setTagName] = useState(props.tag.data.tagName);
  const handleChangeTagName = (event) => {
    setTagName(event.target.value);
  };

  let [tagColor, setTagColor] = useState(props.tag.data.tagColor);
  const handleChangeTagColor = (event) => {
    setTagColor(event.target.value);
  };

  let [textColor, setTextColor] = useState(props.tag.data.textColor);
  const handleChangeTextColor = (event) => {
    setTextColor(event.target.value);
  };

  let [tagDescription, setTagDescription] = useState(
    props.tag.data.description
  );
  const handleChangeTagDescription = (event) => {
    setTagDescription(event.target.value);
    props.setShowDesc(event.target.value);
  };

  const handleEditTag = (event) => {
    event.preventDefault();
    const newTag = {
      ...props.tag,
      data: {
        ...props.tag.data,
        description: tagDescription,
        tagName: tagName,
        textColor: textColor,
        tagColor: tagColor,
        cumulatives: cumulatives,
      },
    };
    props.setThisTag(newTag);

    cumulatives.forEach((cum) => {
      if (cum.changed) {
        const temp = { ...cum };
        delete temp.changed;
        updateCumulative(temp);
      }
    });

    updateTag(newTag).then(() => {
      props.setshowedittag(false);
    });
  };

  useEffect(() => {
    setTagName(props.tag.data.tagName);
    setTagColor(props.tag.data.tagColor);
    setCumulatives(props.tag.data.cumulatives);
    setTextColor(props.tag.data.textColor);
    setTagDescription(props.tag.data.description);
  }, [props.tag]);

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tag - {props.tag.data.tagName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={{ span: 8, offset: 2 }}>
            <Steps step={step} setStep={setStep} steps={steps} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
            {props.tag.id !== 0 && (
              <Row>
                <Col xs={"auto"}>
                  <Tag
                    tag={{
                      ...props.tag,
                      data: {
                        ...props.tag.data,
                        tagColor: tagColor,
                        textColor: textColor,
                        tagName: tagName,
                      },
                    }}
                  />
                </Col>
              </Row>
            )}
          </Col>
        </Row>

        <Container>
          <form onSubmit={handleEditTag}>
            {step === 0 && (
              <>
                <Row>
                  <Col xs={10} lg={{ span: 6, offset: 2 }}>
                    <FormInput
                      className="mt-5"
                      type="text"
                      name="tagName"
                      icon="Cube"
                      placeholder="Enter name for tag here"
                      label="Name and color for tag and then for text"
                      value={tagName}
                      handleChange={handleChangeTagName}
                    />
                  </Col>
                  <Col xs={1} className={"mt-4"}>
                    <Form.Control
                      type="color"
                      onChange={handleChangeTagColor}
                      id="tagcolor"
                      title="Choose your color"
                      value={tagColor}
                    />
                  </Col>
                  <Col xs={1} className={"mt-4"}>
                    <Form.Control
                      type="color"
                      onChange={handleChangeTextColor}
                      id="tagTextcolor"
                      title="Choose the text color"
                      value={textColor}
                    />
                  </Col>{" "}
                </Row>
              </>
            )}

            {step === 1 && (
              <>
                <Row>
                  <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
                    <Form.Group className="mb-3" controlId="tagDesc">
                      <Form.Label>Description of Tag</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={tagDescription}
                        onChange={handleChangeTagDescription}
                      />
                    </Form.Group>{" "}
                  </Col>
                </Row>
              </>
            )}

            {step === 2 && (
              <>
                <Row>
                  <Col>
                    <Form.Label className="mt-3">
                      Cumulative items in the article
                      <BsFillPlusCircleFill
                        onClick={() => addCumulative()}
                        style={{ marginLeft: "1em", cursor: "pointer" }}
                      />
                    </Form.Label>
                  </Col>
                </Row>
                <Row>
                  <div>{JSON.stringify(cumulatives)}</div>
                </Row>
                {cumulatives.map((cumulative, ci) => (
                  <Row key={`cumulativeSet ${ci}`}>
                    <Col xs={9} lg={{ span: 5, offset: 2 }}>
                      <FormInput
                        key={`CumulativeTextInput${ci}`}
                        className=""
                        type="text"
                        name="cumulativetext"
                        icon="Cube"
                        value={cumulative.text}
                        handleChange={handleCumulativeTextChange(ci)}
                      />
                    </Col>
                    <Col xs={1} className={"mt-4"}>
                      <Form.Control
                        type="color"
                        onChange={handleChangeCumColor(ci)}
                        id="cumColor"
                        title="Choose your color"
                        value={cumulatives[ci].color}
                      />
                    </Col>
                    <Col xs={1} className={"mt-4"}>
                      <BsTrash
                        onClick={() => deleteCumulative(ci)}
                        style={{ marginLeft: "1em", cursor: "pointer" }}
                      />
                    </Col>
                  </Row>
                ))}
              </>
            )}
          </form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.setshowedittag(false)}>Close</Button>
        <Button variant="success" onClick={handleEditTag}>
          Update Tag
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTagModal;
