"use client";
import { Box, Button, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { ProductProps } from "../page";
import { DetailProduct } from "@/EndPoints/DetailProduct";
import { DeleteProduct } from "@/EndPoints/DeleteProduct";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

//Página que detalha o produto de acordo com o ID vindo da página lista produto.
export default function DetalheProduto() {
  //Paremetro ID passado para página.
  //Estados para manter os dados vindos da API e Imagem do Produto.
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductProps>();
  const [imageString, setImageString] = useState<string>();

  //Efeito que carrega os detalhes do produto de acordo com o ID.
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await DetailProduct(id);
          setData(response);
          if (response?.ImageType && response?.ImageBase64) {
            const imgString = `${response.ImageBase64}`;
            setImageString(imgString);
          }
        } catch (err) {
          console.error("Error fetching product:", err);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [id]);

  //Função que deleta o produto de acordo com o ID.
  async function Deletar() {
    const idNum = Number(id);
    const response = await DeleteProduct(idNum);
    if (!response) {
      console.log("Falhou");
    }
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Heading size="xl" fontWeight="bold" className="text-center mt-5 mb-2">
        Detalhe do Produto
      </Heading>
      <Flex justify="center" direction="column" className="p-5">
        <Box
          alignItems="center"
          alignSelf="center"
          border="1px black solid"
          className="p-5"
        >
          {imageString ? (
            <div
              style={{ position: "relative", width: "400px", height: "400px" }}
            >
              <Image
                alt="Imagem do Produto"
                src={imageString}
                style={{ objectFit: "contain" }}
              />
            </div>
          ) : (
            <Box>No image available</Box>
          )}
          <Text textStyle="md">Produto: {data?.Nome}</Text>
          <Text textStyle="md">Descrição: {data?.Descricao}</Text>
          <Text textStyle="md">Preço: {data?.Preco}</Text>
          <Text textStyle="md">Categoria: {data?.Categoria}</Text>
          <Box boxOrient="horizontal">
            <Button
              background="black"
              color={"white"}
              size="md"
              className="p-3 rounded-md"
              onClick={Deletar}
            >
              Deletar
            </Button>
            &nbsp;
            <Button
              asChild
              background="black"
              color={"white"}
              size="md"
              className="rounded-md"
            >
              <a href={"/atualizaproduto/" + data?.ProductId}>Atualizar</a>
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}