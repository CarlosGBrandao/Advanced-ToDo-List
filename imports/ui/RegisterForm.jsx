import { Accounts } from "meteor/accounts-base";
import React, { useState } from "react";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();

   
    Accounts.createUser({ username, password }, (error) => {
      if (error) {
        alert("Erro: " + error.reason);
      }
    });
  };

  return (
    <form onSubmit={submit} className="register-form">
      <h2>Criar Conta</h2>
      
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Escolha um nome"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Crie uma senha"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button type="submit">Cadastrar</button>
      </div>
    </form>
  );
};