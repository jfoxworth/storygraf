import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import styles from "./styles.module.css";
import FaIcon from "../FaIcon";

const Footer = () => {
  return (
    <div className={styles.footerBlock}>
      <Container>
        <Row className={"mb-3"}>
          <Col
            xs={{ span: 8, offset: 2 }}
            sm={{ span: 6, offset: 3 }}
            xl={{ span: 2, offset: 5 }}
          >
            <Row style={{ justifyContent: "space-around" }}>
              <div className={styles.footerSocial}>
                <FaIcon
                  icon={"FacebookF"}
                  color={"#CCCCCC"}
                  hoverColor={"#FFFFFF"}
                  outlineType={"circle"}
                />
              </div>
              <div className={styles.footerSocial}>
                <FaIcon
                  icon={"Twitter"}
                  color={"#CCCCCC"}
                  hoverColor={"#FFFFFF"}
                  outlineType={"circle"}
                />
              </div>
              <div className={styles.footerSocial}>
                <FaIcon
                  icon={"RedditAlien"}
                  color={"#CCCCCC"}
                  hoverColor={"#FFFFFF"}
                  outlineType={"circle"}
                />
              </div>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 8, offset: 2 }}>
            <Row style={{ justifyContent: "space-around" }}>
              <Link className={styles.footerLink} href="/">
                Home
              </Link>
              <Link className={styles.footerLink} href="/about">
                About
              </Link>
              <Link className={styles.footerLink} href="/terms">
                Terms
              </Link>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 8, offset: 2 }}>
            <div className={styles.footerCopyright}>
              Copyright StoryGraf 2023
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
