const errorInterceptor = async (error: any): Promise<any> => {
  const statusCode = error.response.status;
  if (statusCode === 401) {
    console.log('data');
    alert(error['message']);
  }
  return Promise.reject(error);
};

export default errorInterceptor;
