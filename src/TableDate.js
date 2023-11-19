import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TableDate() {
  const [data, setDate] = useState([]);

  useEffect(() => {
    axios.get('https://reactfirebases-e82b9-default-rtdb.firebaseio.com/UserData.json')
      .then(response => {
        if (response.data) {
          const formDataList = Object.values(response.data);
          setDate(formDataList);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données depuis Firebase:', error);
      });
  }, []);

  const renderCheckboxSelection = (options, selectedOptions) => {
    if (!Array.isArray(selectedOptions)) {
      return ''; 
    }
    return selectedOptions.map((option, index) => (
      <span key={index}>{options.includes(option) ? '' : ''} {option}&nbsp;</span>
    ));
  };

  const renderRadioSelection = (options, selectedOption) => {
    return options.includes(selectedOption) ? '' : '';
  };

  return (
    <div>
      <h3>Données enregistrées :</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Date de Naissance</th>
            <th>Email</th>
            <th>Niveau de Formation</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((formData, index) => (
            <tr key={index}>
              <td>{formData.nom || ''}</td>
              <td>{formData.prenom || ''}</td>
              <td>{formData.dateNaissance || ''}</td>
              <td>{formData.email || ''}</td>
              <td>{renderCheckboxSelection(["Technicien", "Technicien Spécialisé"], formData.niveauFormation)}</td>
              <td>{renderRadioSelection(["En cours", "Diplômé"], formData.statut)}</td>
              <td>
                <button type="button" className="btn btn-danger">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
