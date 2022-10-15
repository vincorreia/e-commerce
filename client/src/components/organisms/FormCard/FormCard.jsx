import { Footer, AuthForm } from "components/molecules";

export const FormCard = ({
  fields,
  footer,
  header,
  func,
  location,
  buttonTxt,
}) => {
  return (
    <div className="sectionContainer flex-col flex-start form">
      <div className="form-card flex-col">
        <h1>{header}</h1>
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
};
