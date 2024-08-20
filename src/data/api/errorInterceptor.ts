const errorInterceptor = async (error: any): Promise<any> => {
  const statusCode = error.response.status;
  if (statusCode === 401) {
    alert(error['message']);
  }
  return Promise.reject(error);
};

export default errorInterceptor;
