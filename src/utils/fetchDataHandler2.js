
export async function fetchDataHandler({ adress, dataHandler, errorHandler, errorMessage = 'Ошибка сервера' }) {
  try {
    const response = await fetch(adress);
    if (!response.ok) {
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return dataHandler
      ? dataHandler(data)
      : data;
  } catch (error) {
    return errorHandler
      ? errorHandler(error.message)
      : error.message;
  }
}
