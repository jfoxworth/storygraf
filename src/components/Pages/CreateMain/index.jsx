import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { API } from "aws-amplify";
import { listStorygrafs } from "../../../graphql/queries";
import { createStorygraf, updateStorygraf } from "../../../graphql/mutations";
import FormDropdown from "../../shared/Forms/FormDropdown";
import { listTagRelations } from "../../../graphql/queries";
import GrafColumn from "./GrafColumn";
import { Auth } from "aws-amplify";

const CreateMainPage = () => {
  const [tagRelData, setTagRelData] = useState([]); // Changing data holding the relevant tag data for the selected tag
  const [storygraf, setStorygraf] = useState({}); // The current graf
  const [tagStack, setTagStack] = useState([]); // The array of parent tags with the selected tag at the bottom
  const [column, setColumn] = useState(0); // The left, right, or center stack
  const [stackPlace, setStackPlace] = useState(0); // The placement of the tag within this left, right, center tag
  const [numberOfArts, setNumberOfArts] = useState(5); // Number of articles to display for this tag
  const [userData, setUserData] = useState({});

  const getTags = async (id) => {
    console.log(id);
    await API.graphql({
      query: listTagRelations,
      filter: { parentId: { eq: id } },
      variables: { filter: { parentId: { eq: id } } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      console.log("This is what I got for tag " + id);
      console.log(data);
      setTagRelData(unstringData(data.data.listTagRelations.items));
    });
  };

  const getPageGraf = async () => {
    await API.graphql({
      query: listStorygrafs,
      variables: {},
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      console.log("The storygraf data is");
      let temp = data.data.listStorygrafs.items[0] || {};
      temp.data = JSON.parse(temp.data);
      console.log(temp);
      setStorygraf(temp);
    });
  };

  useEffect(() => {
    getPageGraf();
    getTags(0);
    Auth.currentAuthenticatedUser({ bypassCache: true }).then((data) =>
      setUserData(data)
    );
  }, []);

  const unstringData = (items) => {
    items.forEach((item) => {
      item.childTag.data = JSON.parse(item.childTag.data);
    });
    return items;
  };

  const handleChangeTag = (event) => {
    event.preventDefault();
    const thisTag = JSON.parse(event.target.value);
    let temp = tagStack;
    temp.push(thisTag);
    console.log(temp);
    setTagStack(temp);
    getTags(thisTag.id);
  };

  const handleChangeColumn = (event) => {
    event.preventDefault();
    setColumn(event.target.value);
  };

  const handleChangeArticles = (event) => {
    event.preventDefault();
    setNumberOfArts(event.target.value);
  };

  const handleChangeStackPlace = (event) => {
    event.preventDefault();
    setStackPlace(event.target.value);
  };

  // When the button to submit the tag is pressed
  const handleClickSubmit = (event) => {
    event.preventDefault();
    addTagToGraf(tagStack, storygraf);
  };

  const addTagToGraf = () => {
    let tempData = addGrafItem(column, stackPlace, storygraf.data || []);
    tempData.push({
      stack: tagStack,
      column: column,
      stackPlace: stackPlace,
      numberOfArticles: numberOfArts,
      tag: tagStack[tagStack.length - 1],
    });
    setStorygraf({
      ...storygraf,
      data: tempData,
    });
    setStackPlace(0);
    setColumn(0);
    setNumberOfArts(0);
    setTagStack([]);
    getTags(0);
    console.log("The graf data is ...");
    console.log(tempData);
  };

  // This function ensures that the column numbers is consistent and
  // then makes a space for the item being inserted
  const addGrafItem = (column, stackPlace, thisGrafStack) => {
    thisGrafStack.forEach((gs, i) => {
      if (gs.column == column && gs.stackPlace >= stackPlace) {
        thisGrafStack[i]["stackPlace"] = thisGrafStack[i]["stackPlace"] + 1;
      }
    });
    return thisGrafStack;
  };

  const createGraf = async () => {
    let temp = {};
    temp.creatorId = userData.username;
    temp.approved = true;
    temp.data = JSON.stringify(storygraf.data);
    console.log(temp);
    await API.graphql({
      query: createStorygraf,
      variables: { input: temp },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {});
  };

  return (
    <Container>
      <Row className={"mt-5"}>
        <Col
          xs={{ span: 10, offset: 1, order: 2 }}
          md={{ span: 3, offset: 1, order: 1 }}
          className="mt-5"
        >
          {storygraf.data && (
            <GrafColumn
              grafdata={storygraf.data.filter(
                (grafItem) => grafItem.column == "left"
              )}
            />
          )}
        </Col>

        <Col
          xs={{ span: 10, offset: 0, order: 1 }}
          md={{ span: 3, offset: 0, order: 2 }}
          className="mt-1"
        >
          {storygraf.data && (
            <GrafColumn
              grafdata={storygraf.data.filter(
                (grafItem) => grafItem.column == "center"
              )}
            />
          )}
        </Col>

        <Col
          xs={{ span: 10, offset: 0, order: 3 }}
          md={{ span: 3, offset: 0, order: 3 }}
          className="mt-5"
        >
          {storygraf.data && (
            <GrafColumn
              grafdata={storygraf.data.filter(
                (grafItem) => grafItem.column == "right"
              )}
            />
          )}
        </Col>
      </Row>

      <Container>
        <Row className={"mt-3"}>
          <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
            {tagStack.map((tag) => (
              <div>{tag.name}</div>
            ))}
          </Col>
        </Row>

        <Row className={"mt-3"}>
          <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
            <FormDropdown
              handleChange={handleChangeTag}
              options={tagRelData.map((tagRel, index) => ({
                value: JSON.stringify(tagRel.childTag),
                label: tagRel.childTag.name,
              }))}
              label="Select tag"
            />
          </Col>
        </Row>

        <Row className={"mt-3"}>
          <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
            <FormDropdown
              handleChange={handleChangeColumn}
              options={[
                { value: "left", label: "Left" },
                { value: "center", label: "Center" },
                { value: "right", label: "Right" },
              ]}
              label="Select Stack"
            />
          </Col>
        </Row>

        <Row className={"mt-3"}>
          <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
            <FormDropdown
              handleChange={handleChangeStackPlace}
              options={[
                { value: 0, label: 0 },
                { value: 1, label: 1 },
                { value: 2, label: 2 },
                { value: 3, label: 3 },
                { value: 4, label: 4 },
              ]}
              label="Select Stack Place"
            />
          </Col>
        </Row>

        <Row className={"mt-3"}>
          <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
            <FormDropdown
              handleChange={handleChangeArticles}
              options={[
                { value: 1, label: 1 },
                { value: 2, label: 2 },
                { value: 3, label: 3 },
                { value: 4, label: 4 },
                { value: 5, label: 5 },
                { value: 6, label: 6 },
                { value: 7, label: 7 },
                { value: 8, label: 8 },
              ]}
              label="Select Number of articles"
            />
          </Col>
        </Row>

        <Row className={"mt-3"}>
          <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
            <Button onClick={handleClickSubmit}>Add selected tag</Button>
          </Col>
        </Row>
      </Container>

      <Container>
        <Button variant="danger" onClick={createGraf}>
          Create this Graf
        </Button>
      </Container>
    </Container>
  );
};

export default CreateMainPage;
