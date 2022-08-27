import Footer from "./Footer/Footer";
import AuthForm from "./AuthForm/AuthForm";
import Title from "./Title/Title";

function FormCard({ fields, footer, header, func, location, buttonTxt }) {
  return (
    <div className="sectionContainer flex-col center form">
      <div className="form-card flex-col">
        <Title data={header} />
        <AuthForm
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
