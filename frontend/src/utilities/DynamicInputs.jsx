import React, { useState } from 'react';

const DynamicInputs = ({ count, documentType }) => {
  const [inputValues, setInputValues] = useState([]);

  const handleChange = (event, index, field) => {
    const values = [...inputValues];
    values[index][field] = event.target.value;
    setInputValues(values);
  };

  const renderInputs = () => {
    let inputs = [];
    for (let i = 0; i < count; i++) {
      inputs.push(
        <div key={i}>
          <label>
            Nombre:
            <input
              type="text"
              onChange={(event) => handleChange(event, i, 'name')}
            />
          </label>
          <br />
          <label>
            Descripción:
            <input
              type="text"
              onChange={(event) => handleChange(event, i, 'description')}
            />
          </label>
        </div>
      );
    }
    return inputs;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const documents = inputValues.map((input) => {
      return {
        name: input.name,
        description: input.description,
      };
    });
    console.log(documents);
  };

  return (
    <div>
      <h2>{documentType}</h2>
      <form onSubmit={handleSubmit}>
        {renderInputs()}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default DynamicInputs;
