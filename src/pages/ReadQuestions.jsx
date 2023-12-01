import React, { useEffect } from "react";
import { useState } from "react";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./../css/ReadQuestions.css";

function ReadQuestions() {
  const [questions, setQuestions] = useState([]);
  const [questionNames, setQuestionNames] = useState([]);
  const [chosenQuestionName, setChosenQuestionName] = useState("allQuestions");

  const getQuestions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/questions`);
      setQuestions(res.data.data);
      var allQuestionNames = [];
      res.data.data.forEach((question) => {
        if (!allQuestionNames.includes(question.nazivPonude)) allQuestionNames.push(question.nazivPonude);
      });
      setQuestionNames(allQuestionNames);
    } catch (err) {}
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <AdminNavigation />
      <div className="questionsContainer">
        <div className="questionsMainTitle">Upiti</div>
        <Form className="questionName">
          <Form.Group className="questionName" controlId="validationCustom01">
            <Form.Label className="itemTitleElement">Naziv ponude</Form.Label>
            <Form.Select required name="oblastRadionice" aria-label="Default select example" onChange={(e) => setChosenQuestionName(e.target.value)}>
              <option value="allQuestions">Sve ponude</option>
              {questionNames.map((name) => (
                <option value={name}>{name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
        <div className="allQuestionsContainer">
          <div className="questionContainer">
            {chosenQuestionName == "allQuestions" ? <div className="questionTitle">Naziv ponude</div> : <></>}

            <div className="questionTitle">Ime i prezime</div>
            <div className="questionTitle">E-mail</div>
            <div className="questionTitle">Telefon</div>
            <div className="questionTitle">Poruka</div>
            <div className="questionTitle">Tip kontakta</div>
          </div>
          {questions
            .filter((question) => {
              return question.nazivPonude == chosenQuestionName || chosenQuestionName == "allQuestions";
            })

            .map((question) => (
              <div className="questionContainer">
                {chosenQuestionName == "allQuestions" ? <div className="questionInfoItem">{question.nazivPonude}</div> : <></>}

                <div className="questionInfoItem">{question.imePrezime}</div>
                <div className="questionInfoItem">{question.email}</div>
                <div className="questionInfoItem">{question.telefon}</div>
                <div className="questionInfoItem">{question.poruka}</div>
                <div className="questionInfoItem">{question.tipKontakta}</div>
              </div>
            ))}
        </div>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default ReadQuestions;
