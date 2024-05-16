export const GetParamUrl = (url: string, param: string) => {
  // Defina uma expressão regular para capturar o valor do parâmetro após o sinal de igual (=)
  const regex = new RegExp(`${param}=(.*?)(\/|$)`);

  // Use a expressão regular para encontrar o valor do parâmetro na URL
  const match = url.match(regex);

  // Se o parâmetro for encontrado na URL
  if (match && match[1]) {
    return match[1]; // Retorna o valor do parâmetro
  } else {
    console.error(`Parameter '${param}' not found`);
    return "";
  }
};
