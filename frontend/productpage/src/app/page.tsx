"use client";
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
//Página Home
export default function Home() 
{
  return (
    <Box>
      <Heading
        as="h1"
        size="2xl"
        mb={4}
        fontWeight={"bold"}
        justifyContent={"center"}
      >
        Página de Produtos
      </Heading>
      <Flex justify={"center"} textAlign={"center"}>
        <Text>
          Essa página mantém e atualiza os dados dos produtos cadastrados. Para
          acessar a página que lista os produtos, clique no botão abaixo:
        </Text>
        <Button
              asChild
              background="black"
              color={"white"}
              size="md"
              className="rounded-md"
            >
              <a href={"/listaprodutos"}>Atualizar</a>
            </Button>
      </Flex>
    </Box>
  );
}