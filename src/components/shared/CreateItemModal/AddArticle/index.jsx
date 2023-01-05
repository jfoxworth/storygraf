/*  
    This is the content that lets a user add an article to a tag.
    It steps the user through the 4 steps needed.
    1. add a link
    2. add a description
    3. add any salient points
    4. add any cumulatives
*/
import React, { useState, useEffect } from "react";
import FormInput from "../../Forms/FormInput";
import { Row, Col, Form } from "react-bootstrap";
import ArticleLine from "../../ArticleLine";
import { useSource } from "../../../Contexts/SourceContext";
import { useUser } from "../../../Contexts/UserContext";
import Steps from "../../Steps";
import { BsFillPlusCircleFill } from "react-icons/bs";
import FormDropdown from "../../Forms/FormDropdown";
import { parseArticleData } from "../../utils/items";

const AddArticle = ({ tag, item, setItem, source, setSource }) => {
  const sourceData = useSource();
  const userData = useUser();
  const [articleLink, setArticleLink] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userPoints, setUserPoints] = useState(item.data.userPoints);
  const [cumulatives, setCumulatives] = useState(item.data.cumulatives);
  const [dateArray, setDateArray] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedDateType, setSelectedDateType] = useState();
  const [step, setStep] = useState(0);
  const steps = ["Link", "Description", "Date", "Points", "Cumulatives"];

  useEffect(() => {
    setItem({ ...item, type: "ARTICLE" });
  }, []);

  const handleTimeSelect = (e) => {
    setSelectedDateType(e.target.value);
    if (e.target.value !== "enter") {
      setSelectedDate(e.target.value);
      setItem({ ...item, itemDate: e.target.value });
    }
  };

  const handleDateEnter = (e) => {
    setSelectedDate(e.target.value);
    setItem({
      ...item,
      itemDate: e.target.value,
      data: { ...item.data, dateMethod: e.target.value },
    });
  };

  const handleChangeLink = (event) => {
    setArticleSource(event.target.value);
    setArticleLink(event.target.value);
    fetch("http://localhost:3001/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: event.target.value,
      }),
      params: JSON.stringify({
        url: event.target.value,
      }),
    })
      .then((response) => response.text())
      .then((rawdata) => {
        const data = JSON.parse(rawdata);
        parseArticleData(
          { ...data, eURL: event.target.value },
          setDateArray,
          item,
          setItem,
          tag,
          sourceData,
          setSource,
          userData
        );
      });
  };

  const handleChangeDescription = (event) => {
    setUserDescription(event.target.value);
    setItem({
      ...item,
      type: "ARTICLE",
      data: { ...item.data, userDescription: event.target.value },
    });
  };

  const handlePointMade = (index) => (e) => {
    const temp = [...userPoints];
    temp[index] = e.target.value;
    setUserPoints(temp);
    setItem({ ...item, data: { ...item.data, userPoints: temp } });
  };

  const setArticleSource = (url) => {
    sourceData.forEach((source, i) => {
      if (url.includes(source.data.sourceUrl)) {
        setSource(source);
        setItem({ ...item, data: { ...item.data, source: source } });
      }
    });
  };

  const addCumulative = (e) => {
    const temp = [...cumulatives];
    temp.push({ text: "", value: 0 });
    setCumulatives(temp);
    setItem({ ...item, data: { ...item.data, cumulatives: temp } });
  };

  const handleCumulativeTextChange = (index) => (e) => {
    const temp = [...cumulatives];
    temp[index].text = e.target.value;
    setCumulatives(temp);
    setItem({ ...item, data: { ...item.data, cumulatives: temp } });
  };

  const handleCumulativeValueChange = (index) => (e) => {
    const temp = [...cumulatives];
    temp[index].value = e.target.value;
    setCumulatives(temp);
    setItem({ ...item, data: { ...item.data, cumulatives: temp } });
  };

  return (
    <>
      <Steps step={step} setStep={setStep} steps={steps} />

      {!source.id && articleLink.length > 0 && (
        <Row className="mt-3 text-center">
          <Col>
            <h5>All articles must come from an approved source.</h5>
          </Col>
        </Row>
      )}

      {source.id && (
        <Row className="mt-5 margin:auto">
          <Col>
            <ArticleLine variant={"small"} article={item} parentTag={tag} />
          </Col>
        </Row>
      )}

      {step === 0 && (
        <Row className={"mt-3"}>
          <Col>
            <FormInput
              className="mt-5"
              type="text"
              name="articleLink"
              icon="Cube"
              placeholder="Link to article"
              label="Enter the link to the article"
              value={articleLink}
              handleChange={handleChangeLink}
            />
          </Col>
        </Row>
      )}

      {step === 1 && (
        <Row>
          <Col>
            <Form.Label className="mt-3">Description of Article</Form.Label>
            <Form.Control
              as="textarea"
              name={"userDescription"}
              placeholder="Your description of article"
              label={`Your description of article`}
              rows={5}
              onChange={handleChangeDescription}
              value={userDescription}
            />
          </Col>
        </Row>
      )}

      {step === 2 && (
        <Row className={"mt-5"}>
          <Col>
            <FormDropdown
              handleChange={handleTimeSelect}
              options={dateArray}
              label="Select which of the dates is the correct publication date, or
              enter the correct one."
              value={selectedDateType}
            />
            {selectedDateType === "enter" && (
              <div className={"mt-3"}>
                <Form.Control
                  type="date"
                  name="date_of_birth"
                  onChange={handleDateEnter}
                />
              </div>
            )}
          </Col>
        </Row>
      )}

      {step === 3 && (
        <Row>
          <Col>
            <Form.Label className="mt-3">
              Points made by article
              <BsFillPlusCircleFill
                style={{ marginLeft: "1em" }}
                onClick={() => {
                  setUserPoints(userPoints.concat(""));
                }}
              />
            </Form.Label>

            {userPoints.map((point, pi) => (
              <FormInput
                key={`PointInput${pi}`}
                className=""
                type="text"
                name="point"
                icon="Cube"
                value={point}
                handleChange={handlePointMade(pi)}
                placeholder="Point made"
              />
            ))}
          </Col>
        </Row>
      )}

      {step === 4 && (
        <>
          <Row>
            <Col>
              <Form.Label className="mt-3">
                Cumulative items in the article
                <BsFillPlusCircleFill
                  onClick={() => addCumulative()}
                  style={{ marginLeft: "1em" }}
                />
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              {cumulatives.map((cumulative, ci) => (
                <FormInput
                  key={`CumulativeTextInput${ci}`}
                  className=""
                  type="text"
                  name="cumulativetext"
                  icon="Cube"
                  value={cumulative.text}
                  handleChange={handleCumulativeTextChange(ci)}
                />
              ))}
            </Col>
            <Col>
              {cumulatives.map((cumulative, ci) => (
                <FormInput
                  key={`CumulativeValueInput${ci}`}
                  className=""
                  type="text"
                  name="cumulativeinput"
                  icon="Cube"
                  value={cumulative.value}
                  handleChange={handleCumulativeValueChange(ci)}
                />
              ))}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default AddArticle;
