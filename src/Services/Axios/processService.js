import { APIProcess } from "./BaseService";

export async function getAllProcess(toast) {
  try {
    const response = await APIProcess.get("/records", {});
    console.log(`${JSON.stringify(response)}`);
    return response.data;
  } catch (err) {
    const status = err.response?.status;

    if (status === 400) {
      toast.error("Requisição inválida");
    } else {
      toast.error("Não foi possivel realizar a requisição");
    }
  }
}

export async function getProcessByID(ID, toast) {
  try {
    const response = await APIProcess.get(`/records/${ID}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("Erro ao buscar processo!");
  }
}

export async function getProcessByPage(page, toast) {
  try {
    const response = await APIProcess.get(`/records/page/${page}`);
    return response.data;
  } catch (error) {
    toast.error("Erro ao buscar processo!");
  }
}

export async function getProcessTotalNumber(ID, toast) {
  try {
    const response = await APIProcess.get("/count/records");
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("Erro ao buscar total de registros!");
  }
}

export async function createRecord(recordInfo, toast) {
  try {
    console.log(recordInfo);
    const record = await APIProcess.post("/records", recordInfo);
       toast.success(
        `Registro criado com sucesso sob o n° ${record.data.register_number}`
      );
      return(record.data.register_number);
  } catch (err) {
    const status = err.response?.status;

    if (status === 500) {
      toast.error("Não foi possível criar o registro");
    }
  }
}
