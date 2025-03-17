"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  Toast,
  Input,
  Textarea,
  Fieldset,
  Stack,
  Field,
  NativeSelect,
  HStack,
  List,
} from "@chakra-ui/react";
import { ProductProps } from "../page";
import { DetailProduct } from "@/EndPoints/DetailProduct";
import { DeleteProduct } from "@/EndPoints/DeleteProduct";
import { useEffect, useState } from "react";

export default async function DetalheProduto({params} : {params : Promise<{id : string}>}) {
    const {id} = await params;
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState<ProductProps>();

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          const response = await DetailProduct(id).catch((err) => {
            console.log(err.status);
          });
          setData(response);
          setLoading(false);
        };
        fetchData();
      }, []);


     async function Deletar() {
      const idNum = Number(id);
      const response = await DeleteProduct(idNum);
      if(!response) {
        console.log("Falhou");
      }
    }
  return (<Box>
    <Heading size="xl" fontWeight="bold" className="text-center mt-5 mb-2">Detalhe do Produto</Heading>
    <Flex justify="center" textAlign="left">
      <Text textStyle="md">Produto: {data?.Nome}</Text>
      <Text textStyle="md">Descrição: {data?.Descricao}</Text>
      <Text textStyle="md">Preço: {data?.Preco}</Text>
      <Text textStyle="md">Categoria: {data?.Descricao}</Text>
      <Box boxOrient="horizontal">
        <Button colorPalette="black" size="md" className="p-1 rounded-md mr-5px"
        onClick={Deletar}>Deletar</Button>
        <Button asChild colorPalette="black" size="md" className="rounded-md">
          <a href={"/atualizaproduto/" + data?.ProductId}>Atualizar</a>
        </Button>
      </Box>
    </Flex>
  </Box>);
}
  
/*
  return (
    <div>
        <h1 className="text-center mt-5 mb-2 font-bold text-3xl">Detalhe do Produto</h1>
        <div className="flex justify-center">
          <div className="text-left">
            <h2>Produto: {Detalhes.nome}</h2>
            <p>Descrição: {Detalhes.descricao}</p>
            <p>Preço: R$ {Detalhes.preco}</p>
            <p>Categoria: {Detalhes.categoria}</p>
            <div>
              <button className="bg-zinc-900 text-white p-1 rounded-md" 
              onClick={Deletar}>Deletar</button>&nbsp;&nbsp;
              <a className="bg-zinc-900 text-white p-1.5 rounded-md"
              href={"/atualizaproduto/" + Detalhes.productId}>Atualizar</a>
            </div>
          </div>
        </div>
    </div>
  );
}
  */