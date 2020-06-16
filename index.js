const fs = require("fs");
const questions = require("./questions.json");

const parser = (data) => {
  const newData = data.map((question) => {
    const unescapedProps = unescape(question.props);
    const parsedProps = JSON.parse(unescapedProps);

    parsedProps.section.headingInHeader = false;

    if (!parsedProps.hasOwnProperty("widths")) {
      parsedProps.widths = { lg: "", md: "", sm: "", xl: "", xs: "" };
    }

    if (!parsedProps.hasOwnProperty("submitOnClick")) {
      parsedProps.submitOnClick = false;
    }

    const stringifiedProps = JSON.stringify(parsedProps);
    question.props = stringifiedProps;
    return question;
  });

  return JSON.stringify(newData);
};

const newQuestionsJson = parser(questions);

fs.writeFile("./new-questions.json", newQuestionsJson, (err) => {
  console.log(err);
});
