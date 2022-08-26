import Footer from "./Footer/Footer";
import Form from "./Form/Form";
import Title from "./Title/Title";

function FormCard({ fields, footer, header, func, location, buttonTxt }) {
  return (
    <div className="sectionContainer flex-col center form">
      <div className="form-card flex-col">
        <Title data={header} />
        <Form
          fields={fields}
          func={func}
          location={location}
          buttonTxt={buttonTxt}
        />
      </div>
      <Footer data={footer} />
    </div>
  );
}

export default FormCard;
