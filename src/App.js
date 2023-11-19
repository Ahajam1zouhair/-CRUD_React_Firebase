import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [email, setEmail] = useState("");
  const [niveauFormation, setNiveauFormation] = useState([]);
  const [statut, setStatut] = useState("En cours");
  const [cinFile, setCinFile] = useState(null);
  const [bacFile, setBacFile] = useState(null);

  const [isNomValid, setIsNomValid] = useState(false);
  const [isPrenomValid, setIsPrenomValid] = useState(false);
  const [isDateNaissanceValid, setIsDateNaissanceValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [formDataArray, setFormDataArray] = useState([]);

  const handleNomChange = (e) => {
    const value = e.target.value;
    setNom(value);
    setIsNomValid(value.trim() !== ""); // Vérifie si le champ n'est pas vide
  };

  const handlePrenomChange = (e) => {
    const value = e.target.value;
    setPrenom(value);
    setIsPrenomValid(value.trim() !== ""); // Vérifie si le champ n'est pas vide
  };

  const handleDateNaissanceChange = (e) => {
    const value = e.target.value;
    setDateNaissance(value);
    setIsDateNaissanceValid(value.trim() !== ""); // Vérifie si le champ n'est pas vide
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handleNiveauFormationChange = (e) => {
    const value = e.target.value;
    if (niveauFormation.includes(value)) {
      setNiveauFormation(niveauFormation.filter((item) => item !== value));
    } else {
      setNiveauFormation([...niveauFormation, value]);
    }
  };

  const handleStatutChange = (e) => {
    setStatut(e.target.value);
  };

  const handleCinFileChange = (e) => {
    const file = e.target.files[0];
    setCinFile(file);
  };

  const handleBacFileChange = (e) => {
    const file = e.target.files[0];
    setBacFile(file);
  };






  const handleSubmit = () => {
    if (isNomValid && isPrenomValid && isDateNaissanceValid && isEmailValid) {
      const newFormData = {
        nom,
        prenom,
        dateNaissance,
        email,
        niveauFormation,
        statut,
        bacFile,
        cinFile,
      };

      // Ajout des nouvelles données au tableau
      setFormDataArray([...formDataArray, newFormData]);

      // Envoi des données à Firebase
      axios
        .post(
          "https://reactfirebases-e82b9-default-rtdb.firebaseio.com/UserData.json",
          newFormData
        )
        .then((response) => {
          console.log("Données enregistrées avec succès:", response.data);
          // Ajoutez ici toute autre logique après l'enregistrement des données
        })
        .catch((error) => {
          console.error("Erreur lors de l'enregistrement des données:", error);
          // Ajoutez ici toute autre logique en cas d'erreur
        });

      // Réinitialisation des champs après la soumission
      setNom("");
      setPrenom("");
      setDateNaissance("");
      setEmail("");
      setNiveauFormation([]);
      setStatut("En cours");
      setCinFile(null);
      setBacFile(null);
    } else {
      alert("Veuillez remplir tous les champs obligatoires correctement.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Formulaire d'inscription</h2>
      <form>
        {/* Nom */}
        <div className={`mb-3 ${isNomValid ? "has-success" : "has-danger"}`}>
          <label htmlFor="nom" className="form-label">
            Nom
          </label>
          <input
            type="text"
            className={`form-control ${isNomValid ? "is-valid" : "is-invalid"}`}
            id="nom"
            value={nom}
            onChange={handleNomChange}
          />
          <div className="invalid-feedback">Le nom est requis.</div>
        </div>

        {/* Prénom */}
        <div className={`mb-3 ${isPrenomValid ? "has-success" : "has-danger"}`}>
          <label htmlFor="prenom" className="form-label">
            Prénom
          </label>
          <input
            type="text"
            className={`form-control ${
              isPrenomValid ? "is-valid" : "is-invalid"
            }`}
            id="prenom"
            value={prenom}
            onChange={handlePrenomChange}
          />
          <div className="invalid-feedback">Le prénom est requis.</div>
        </div>

        {/* Date de Naissance */}
        <div
          className={`mb-3 ${
            isDateNaissanceValid ? "has-success" : "has-danger"
          }`}
        >
          <label htmlFor="dateNaissance" className="form-label">
            Date de Naissance
          </label>
          <input
            type="date"
            className={`form-control ${
              isDateNaissanceValid ? "is-valid" : "is-invalid"
            }`}
            id="dateNaissance"
            value={dateNaissance}
            onChange={handleDateNaissanceChange}
          />
          <div className="invalid-feedback">
            La date de naissance est requise.
          </div>
        </div>

        {/* Email */}
        <div className={`mb-3 ${isEmailValid ? "has-success" : "has-danger"}`}>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${
              isEmailValid ? "is-valid" : "is-invalid"
            }`}
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="invalid-feedback">L'email doit être valide.</div>
        </div>

        {/* Niveau de formation */}
        <div className="mb-3">
          <label className="form-label">Niveau de formation</label>

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="technicien"
              value="Technicien"
              checked={niveauFormation.includes("Technicien")}
              onChange={handleNiveauFormationChange}
            />
            <label className="form-check-label" htmlFor="technicien">
              Technicien
            </label>
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="technicienSpecialise"
              value="Technicien Spécialisé"
              checked={niveauFormation.includes("Technicien Spécialisé")}
              onChange={handleNiveauFormationChange}
            />
            <label className="form-check-label" htmlFor="technicienSpecialise">
              Technicien Spécialisé
            </label>
          </div>
        </div>

        {/* Statut */}
        <div className="mb-3">
          <label className="form-label">Statut</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="enCours"
              value="En cours"
              checked={statut === "En cours"}
              onChange={handleStatutChange}
            />
            <label className="form-check-label" htmlFor="enCours">
              En cours
            </label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="diplome"
              value="Diplômé"
              checked={statut === "Diplômé"}
              onChange={handleStatutChange}
            />
            <label className="form-check-label" htmlFor="diplome">
              Diplômé
            </label>
          </div>
        </div>

        {statut === "Diplômé" && (
          <div className="mb-3">
            <label htmlFor="uploadBac" className="form-label">
              Charger votre BAC
            </label>
            <input
              type="file"
              className="form-control"
              id="uploadBac"
              onChange={handleBacFileChange}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="uploadCIN" className="form-label">
            Charger votre CIN Recto/Verso
          </label>
          <input
            type="file"
            className="form-control"
            id="uploadCIN"
            onChange={handleCinFileChange}
            required
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={
            !isNomValid ||
            !isPrenomValid ||
            !isDateNaissanceValid ||
            !isEmailValid
          }
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default App;
