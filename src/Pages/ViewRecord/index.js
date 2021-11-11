import React, { useEffect, useState } from "react";
import HeaderWithButtons from "../../Components/HeaderWithButtons";
import {
  StyledDivInfoProcess,
  StyledDivShowProcess,
  StyledDivSupProcess,
  StyledDivButtons,
  StyledInfoSection,
} from "./style";
import { FaUserCircle, FaTelegramPlane, FaPen } from "react-icons/fa";
import DropDownButton from "../../Components/DropDownButton";
import ForwardSector from "../../Components/ForwardSector";
import GenericWhiteButton from "../../Components/GenericWhiteButton";
import GenericBlueButton from "../../Components/GenericBlueButton";
import toast, { Toaster } from "react-hot-toast";
import { history } from "../../history";
import {
  closeRecord,
  forwardRecordInfo,
  getProcessByID,
  getRecordHistory,
  setStatusRecord,
  getUserByEmail,
} from "../../Services/Axios/processService";
import { getRecordTagColors } from "../../Services/Axios/tagsService";
import {
  getDepartments,
  getInfoUser,
} from "../../Services/Axios/profileService";
import { useParams } from "react-router";
<<<<<<< HEAD
import { TagsList } from "./tags";

// Componente para visualizar registro
=======
import { ModalDoubleCheck } from "../../Components/ModalDoubleCheck";

>>>>>>> devel
const ViewRecord = () => {
  const naoCadastrada = "Informação não cadastrada";
  const { id } = useParams();
  const [sector, setSector] = useState("");
  const [forward, setForward] = useState([]);
  const [forwardData, setForwardData] = useState("");

  const [registerNumber, setRegisterNumber] = useState("");
  const [requester, setRequester] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [receiptForm, setReceiptForm] = useState("");
  const [seiNumber, setSeiNumber] = useState("");
  const [documentDate, setDocumentDate] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentContactInfo, setDocumentContactInfo] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userSectorNum, setUserSectorNum] = useState("");
  const [tags, setTags] = useState([]);

  const [buttonModalConfirmForward, setButtonModalConfirmForward] = useState("");
  const [buttonModal, setButtonModal] = useState("");
  const [buttonDone, setButtonDone] = useState(false);

  useEffect(() => {
    async function fetchRecordData() {
      // get all records data by process by id
      const record = await getProcessByID(id, toast);

      setRegisterNumber(record.register_number);
      setSeiNumber(record.sei_number);
      setDocumentDate(record.document_date);
      setRequester(record.requester);
      setCity(record.city);
      setState(record.state);
      setDescription(record.description);
      setState(record.state);
      setReceiptForm(record.receipt_form);
      setDocumentNumber(record.document_number);
      setDocumentContactInfo(record.contact_info);
      setDocumentType(record.document_type);

      const user = await getInfoUser(toast);
      console.log(user, "teste");
      setUserName(user.name);
<<<<<<< HEAD

      console.log(user.departments);

=======
      setUserEmail(user.email);
>>>>>>> devel
      setUserSectorNum(user.departments[0].id);

      const responseHR = await getRecordHistory(toast, id);
      console.log("responseHR",responseHR);
      const arrInfoForward = await Promise.all(
        responseHR.map((post) => previousForward(post))
      );

      await setForward(arrInfoForward);

      if (record.situation === "finished") {
        setButtonDone(true);
        document.querySelector(".forwardIcon").style.display = "none";
      }
    }

    async function fetchTagsData() {
      const [httpCode, recordTags] = await getRecordTagColors(id);
      if (httpCode === 200 && recordTags.length > 0) {
        setTags(recordTags);
      }
    }

    fetchTagsData();
    fetchRecordData();
  }, [forwardData]);

  const getDate = () => {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, "0");
    var mes = String(data.getMonth() + 1).padStart(2, "0");
    var ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
  };

  const handleButtonProcessDone = () => {
    setButtonModal(true);
  };

  const handleButtonProcessReopen = () => {
    toast.loading("Estamos trabalhando nisso ... :)", { duration: 3000 });
  };

  const handleForward = async () => {
    setButtonModalConfirmForward(true);
  };

  const handleClickModalConfirmForward = async () => {
    const forwardRecInfo = {
      id: id,
      forwarded_by: userEmail,
      origin_id: userSectorNum,
      destination_id: sector,
    };
    await forwardRecordInfo(toast, forwardRecInfo);
    setButtonModalConfirmForward(false);
  }

  const handleClickModalWhite = () => {
    setButtonModal(false);
    setButtonModalConfirmForward(false);
  };

  const handleClickModalBlue= async () => {

    //setting data of who forwarded the record
    const infoRecord = {
      id: id,
      closed_by: userEmail,
      reason: " ",
    }

    //send request to close record
    const response = await closeRecord(infoRecord, toast);
    console.log(response);

    const newForward = [
      ...forward,
      {
        name: userName,
        defaultText: "Registro: Concluido",
        date: getDate(),
      },
    ];

    await setStatusRecord(id, "finished", toast);
    setForward(newForward);
    setButtonModal(false);
    setButtonDone(true);

    document.querySelector(".forwardIcon").style.display = "none";
    setForwardData(infoRecord);
  };

  const formatedDate = (infoDate) => {
    const dataDone = new Date(infoDate);
    return dataDone.getDate() + "/" + (dataDone.getMonth() + 1) + "/" + dataDone.getFullYear(); 
  }

  const previousForward = async (response) => {
    let newForward = {};
    const email = response.forwarded_by;

    if (email != null) {
      const infoUser = await getUserByEmail(email);
      const destinationID = response.destination_id;
      const originSecID = response.origin_id;
      console.log("originsecid",originSecID);
      const allDepartments2 = await getDepartments();
      console.log("Allsec", allDepartments2);

      const destinationSection = allDepartments2.filter((indice) => {
        return indice.id === destinationID;
      });

      const originSection = allDepartments2.filter((indice) => {
        return indice.id === originSecID;
      });

      const dataFormatadaCreatedAt = formatedDate(response.createdAt);
      const dataFormatadaUpdatedAt = formatedDate(response.updatedAt);

      newForward = {
        setor: destinationSection[0].name,
        setorOrigin: originSection[0].name,
        date: dataFormatadaCreatedAt,
        dateForward: dataFormatadaUpdatedAt,
        name:infoUser.name,
      };
    } else if (response.closed_by != null) {
      const dateDoneReg = formatedDate(response.closed_at);
      const infoUserDone = await getUserByEmail(response.closed_by);
      newForward = {
        setor: " ",
        setorOrigin: response.origin_name,
        defaultText: "Registro Concluído",
        date: dateDoneReg,
        dateForward: " ",
        name: infoUserDone.name,
      }
    } else {
      const infoUser = await getUserByEmail(response.created_by);
      console.log("info user",infoUser);
      const createDate = formatedDate(response.created_at);
      newForward = {
        setor: " ",
        setorOrigin: response.origin_name,
        defaultText: "Registro criado em: ",
        date: createDate,
        dateForward: " ",
        name: infoUser.name,
      }
    }
      return newForward;
};

  function handleEditRegister() {
    history.push(`/editar-registro/${id}`);
    window.location.reload();
  }

  return (
    <>
      <HeaderWithButtons />
      <StyledDivSupProcess>
        <StyledDivShowProcess>
          <StyledInfoSection>
            <div>
              <h2>Nº do registro:&nbsp;</h2>
              <h2>{registerNumber ? registerNumber : "Erro"}</h2>
              <FaPen size="2rem" onClick={handleEditRegister} class="info-icon" />
            </div>
            <div>
              <h3>Descrição:&nbsp;</h3>
              <h3>{description ? description : "Erro"}</h3>
            </div>
            <div>
              <h3>Localidade:&nbsp;</h3>
              <h3>{city ? city : "Erro"}</h3>
              <h3>-</h3>
              <h3>{state ? state : "Erro"}</h3>
            </div>
            <div>
              <h3>Solicitante:&nbsp;</h3>
              <h3>{requester ? requester : "Erro"}</h3>
            </div>
            <div>
              <h3>Recebido via:&nbsp;</h3>
              <h3>{receiptForm ? receiptForm : "Erro"}</h3>
            </div>
            <div>
              <h3>Tipo de documento:&nbsp;</h3>
              <h3>{documentType ? documentType : naoCadastrada}</h3>
            </div>
            <div>
              <h3>Nº do documento:&nbsp;</h3>
              <h3>{documentNumber ? documentNumber : naoCadastrada}</h3>
            </div>
            <div>
              <h3>Nº do SEI:&nbsp;</h3>
              <h3>{seiNumber ? seiNumber : naoCadastrada}</h3>
            </div>
            <div>
              <h3>Data do documento:&nbsp;</h3>
              <h3>{documentDate ? documentDate : naoCadastrada}</h3>
            </div>
            <div>
              <h3>Informações de contato:&nbsp;</h3>
              <h3 id="contact-info">
                {documentContactInfo ? documentContactInfo : naoCadastrada}
              </h3>
            </div>
          </StyledInfoSection>
          <ForwardSector forward={forward} />

          <StyledDivButtons>
            <GenericWhiteButton title="voltar" onClick={() => window.history.back()} />
<<<<<<< HEAD
            <GenericRedButton title="concluir" onClick={handleButtonProcess} />
=======
            <GenericBlueButton title={buttonDone ? "Reabrir" : "Concluir"}
              onClick={buttonDone ? handleButtonProcessReopen : handleButtonProcessDone} />
>>>>>>> devel
          </StyledDivButtons>
        </StyledDivShowProcess>
        <StyledDivInfoProcess>
          <span>Servidor:</span>
          <div className="issuerIcon">
            <FaUserCircle />
            <p>{userName === "" ? "Policia Federal (mock)" : userName}</p>
          </div>
          <span>Departamento:</span>

          <DropDownButton onChangeOpt={(event) => setSector(event.target.value)} />
          <div className="forwardIcon">
            <p onClick={handleForward}>Encaminhar</p>
            <FaTelegramPlane />
          </div>
          <span>Tags:</span>
          <div className="tagsTest">
            <TagsList id={id} />
          </div>

          <a className="historic" href="/historico-registro">
            Histórico de alterações
          </a>
        </StyledDivInfoProcess>
        <ModalDoubleCheck
          content="Você tem certeza que quer concluir esse Registro?"
          trigger={buttonModal}
          titleBlueButton="Concluir"
          titleWhiteButton="Cancelar"
          onClickBlueButton={handleClickModalBlue}
          onClickWhiteButton={handleClickModalWhite}
        />
        <ModalDoubleCheck
          content="Deseja realmente encaminhar esse registro?"
          trigger={buttonModalConfirmForward}
          titleBlueButton="confirmar"
          titleWhiteButton="Cancelar"
          onClickBlueButton={handleClickModalConfirmForward}
          onClickWhiteButton={handleClickModalWhite}
        />
      </StyledDivSupProcess>
      <Toaster />
    </>
  );
};

export default ViewRecord;
