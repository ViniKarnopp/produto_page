"use client";
import { Box, Button, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { ProductProps } from "../page";
import { DetailProduct } from "@/EndPoints/DetailProduct";
import { DeleteProduct } from "@/EndPoints/DeleteProduct";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NextImage from "next/image";

export default function DetalheProduto() {
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductProps>();
  const [imageString, setImageString] = useState<string>();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await DetailProduct(id);
          setData(response);
          console.log(response);
          console.log(data);
          // Create image string from response data, not from stale state
          if (response?.ImageType && response?.ImageBase64) {
            const imgString = `data:${response.ImageType};base64,${response.ImageBase64}`;
            setImageString(imgString);
            console.log(imageString);
          }
        } catch (err) {
          console.error("Error fetching product:", err);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [id]);

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
            <div style={{ position: 'relative', width: '400px', height: '400px' }}>
              <Image
                alt="Imagem do Produto"
                src={imageString}
                style={{ objectFit: 'contain' }}
              />
            </div>
          ) : (
            <Box>No image available</Box>
          )}
          <Text textStyle="md">Produto: {data?.Nome}</Text>
          <Text textStyle="md">Descrição: {data?.Descricao}</Text>
          <Text textStyle="md">Preço: {data?.Preco}</Text>
          <Text textStyle="md">Categoria: {data?.Descricao}</Text>
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

/*{imageString ? (
            <Box
              style={{ position: "relative", width: "400px", height: "400px" }}
            >
              <Image asChild style={{ objectFit: "contain" }}>
                <NextImage
                  alt="Imagem do Produto"
                  src={imageString}
                  width={400}
                  height={400}
                />
              </Image>
            </Box>
          ) : (
            <Box>No image available</Box>
          )}*/