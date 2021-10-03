import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiUserCircle } from "react-icons/bi";
import Header from "../../Components/Header";
import { registerUser } from "../../Services/Axios/profileService";
import { SectionsList } from "./sections";

import {
    StyledBlueRectangle,
    StyledButtonsDiv,
    StyledBackButton,
    StyledEditButton,
    StyledForms,
    StyledViewProfile,
    StyledWhiteRectangle,
} from "./styles";

const ViewProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState(1);
    const [level] = useState(2);

    async function handleSubmit(event) {
        console.log(`department: ${department}`);
        const user = {
            email,
            password,
            departmentID: department,
            level,
        };

        await registerUser(user, toast);
    }

    return (
        <>
            <Header />
            <div>
                <StyledViewProfile>
                    <StyledBlueRectangle>
                        <BiUserCircle size="20rem" color="white" />
                    </StyledBlueRectangle>

                    <StyledWhiteRectangle>
                        <StyledForms>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <h1>Name</h1>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="William Cops"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <h1>Email</h1>
                                    <input
                                        id="email"
                                        type="text"
                                        placeholder="william@pcgo.org.br"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <h1>Setor</h1>
                                    <select
                                        required
                                        placeholder="Selecione o departamento"
                                        onLoad={(event) =>
                                            setDepartment(event.target.value)
                                        }
                                        onChange={(event) =>
                                            setDepartment(event.target.value)
                                        }>
                                        <SectionsList />
                                    </select>
                                </div>
                                <div>
                                    <h1>Senha</h1>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Senha"
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        value={password}
                                    />
                                </div>
                            </form>
                        </StyledForms>
                        <StyledButtonsDiv>
                            <StyledBackButton onClick={() => window.history.back()}>
                                Voltar
                            </StyledBackButton>
                            <StyledEditButton onClick={handleSubmit}>
                                Cadastrar
                            </StyledEditButton>
                        </StyledButtonsDiv>
                    </StyledWhiteRectangle>
                </StyledViewProfile>
                <Toaster />
            </div>
        </>
    );
};

export default ViewProfile;
