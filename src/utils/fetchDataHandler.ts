interface IDataHandlerParams {
  adress: string;
  dataHandler?: (data: any[]) => any;
  errorHandler?: (message: string) => any;
  errorMessage?: string;
}

export async function fetchDataHandler({
  adress,
  dataHandler,
  errorHandler,
  errorMessage = 'Ошибка сервера',
}: IDataHandlerParams): Promise<any> {
  try {
    const response = await fetch(adress);
    if (!response.ok) {
      return errorHandler
        ? errorHandler(errorMessage)
        : new Error(errorMessage);
    }
    const data: any = await response.json();
    return dataHandler
      ? dataHandler(data)
      : data;
  } catch (error: any) {
    return errorHandler
      ? errorHandler(error?.message)
      : error?.message;
  }
}
