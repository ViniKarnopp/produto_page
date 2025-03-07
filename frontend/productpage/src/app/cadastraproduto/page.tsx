"use client";
import { AddProduct } from "@/EndPoints/AddProduct";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spinner,
  Text,
  Toast,
  Input,
  Textarea,
  Fieldset,
  Stack,
  Field,
  NativeSelectField,
  NativeSelectRoot,
} from "@chakra-ui/react";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { InputField } from "@/components/form/inputfield";
import { SelectField} from "@/components/form/selectfield";
import { ImageUploader} from "@/components/form/imageuploader";
import { TextareaField } from "@/components/form/textareafield";
//import { useLocation, useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  nome: Yup.string().required("Campo Obrigatório"),
  descricao: Yup.string(),
  preco: Yup.number().positive().required("Campo Obrigatório"),
  categoria: Yup.string().required("Campo Obrigatório"),
});

export default async function CadastraProduto() {
  const formRef = useRef<FormHandles>(null);
  const [fotoProduto, setFotoProduto] = useState();


  async function Salvar(dadosForm: FormData) {
    "use client";
    
    //Atribuindo valores do input a váriaveis
    const nome = dadosForm.get("nomeProduto") as string;
    const precoString = dadosForm.get("precoProduto") as string;
    const preco = Number(precoString);
    const categoria = dadosForm.get("categoriaProduto") as string;
    const descricao = dadosForm.get("descricaoProduto") as string;
    const body = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      categoria: categoria
    }
    await schema.validate(body, {abortEarly: false});

    const response = AddProduct(nome, descricao, preco, categoria, fotoProduto);
    if (!response) {
      console.log("Falhou a Execução");
    } else {
      console.log("Executou");
    }
  }
  return (
    <Box height="100%" overflow="hidden">
      <Heading size="lg">Cadastro de Produto</Heading>
      <Flex
        height="100%"
        pb="10px"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        w="100%"
      >
        <Form
          ref={formRef}
          onSubmit={Salvar}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Fieldset.Root size="lg" maxW="md">
            <Stack>
              <Fieldset.Legend>Cadastro de Produtos</Fieldset.Legend>
            </Stack>

            <Fieldset.Content>
              <Field.Root>
                <InputField
                  type="text"
                  name="nomeProduto"
                  label="Nome"
                  placeholder="Nome do Produto" 
                />
              </Field.Root>
              <Field.Root>
                <TextareaField
                   size="md"
                   resize="vertical"
                   name="descricaoProduto"
                   label="Descrição"
                   placeholder="Descrição do Produto" 
                />
              </Field.Root>
              <Field.Root>
                <InputField
                  type="number"
                  name="precoProduto"
                  placeholder="Preço do Produto"
                  step="0.01"
                  label="Preço"
                />
              </Field.Root>
              <Field.Root>
                <SelectField
                  name="categoriaProduto"
                  label="Categoria"
                  items={[
                    {label: "Eletrônicos", value: "Eletrônicos"},
                    {label: "Roupas", value: "Roupas"},
                    {label: "Alimentos", value: "Alimentos"},
                    {label: "Livros", value: "Livros"},
                    {label: "Outros", value: "Outros"},
                  ]}
                 />
              </Field.Root>
              <Field.Root>
                <Field.Label>Foto</Field.Label>
                <Input
                  type="file"
                  name="fotoProduto"
                  placeholder="Foto do Produto"
                  onChange={setFotoProduto}
                />
              </Field.Root>
            </Fieldset.Content>
            <Button type="submit" alignSelf="flex-start">Salvar</Button>
          </Fieldset.Root>
        </Form>
      </Flex>
    </Box>
  );
}
/*
  return (
    <div>
      <h1 className="h1">Cadastro de Produto</h1>
      <br />
      <br />
      <div className="flex justify-center">
        <form className="flex-col text-left" action={Salvar}>
          <div className="row">
            <div className="column-3 column label">
              <label htmlFor="nomeProduto">Nome: </label>
            </div>
            <div className="column-9 column input">
              <input
                className="border border-zinc-900 rounded-md"
                type="text"
                name="nomeProduto"
                id="nomeProduto"
                placeholder="Nome do Produto"
                required
              />
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="column-3 column label">
              <label htmlFor="descricaoProduto">Descrição:</label>
            </div>
            <div className="column-9 column textarea">
              <textarea
                className="border border-zinc-900 rounded-md"
                id="descricaoProduto"
                name="descricaoProduto"
                cols={22}
                rows={4}
                placeholder="Descrição do Produto"
              />
            </div>
          </div>
          <div className="row">
            <div className="column-3 column label">
              <label htmlFor="precoProduto">Preço: </label>
            </div>
            <div className="column-9 column input">
              <input
                className="border border-zinc-900 rounded-md"
                type="number"
                name="precoProduto"
                id="precoProduto"
                min="0"
                step="0.01"
                placeholder="R$ Preço do Produto"
                required
              />
            </div>
            <div className="row">
              <div className="column-3 column label">
                <label htmlFor="=categoria">Categoria: </label>
              </div>
              <div className="column-9 column input">
                <select
                  className="border border-zinc-900 rounded-md"
                  name="categoria"
                  id="categoria"
                  required
                >
                  <option value="Eletrônico">Eletrônico</option>
                  <option value="Roupas">Roupas</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Livros">Livros</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="column-3 column label">
                <label>Foto: </label>
              </div>
              <div className="column-9 column input">
                <input type="file" name="fotoProduto" id="fotoProduto"/>
              </div>
            </div>
            <div className="row">
              <button
                className="bg-zinc-900 text-white p-1 rounded-md"
                type="submit"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
  <Box w="100%" mt={10}>
            <label>Nome: </label>
            <Input
              type="text"
              name="nomeProduto"
              placeholder="Nome do Produto"
            />
          </Box>
          <Box>
            <FormControl>
              <Box w="100%" mt={10}>
                <FormLabel>Descrição: </FormLabel>
                <Textarea
                  size="md"
                  resize="vertical"
                  name="descricaoProduto"
                  placeholder="Descrição do Produto"
                />
              </Box>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <Box w="100%" mt={10}>
                <FormLabel>Preço: </FormLabel>
                <Input
                  type="number"
                  name="precoProduto"
                  placeholder="Preço do Produto"
                />
              </Box>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <Box w="100%" mt={10}>
                <FormLabel>Categoria: </FormLabel>
                <NativeSelect.Root>
                  <NativeSelect.Field name="categoriaProduto">
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Roupas">Roupas</option>
                    <option value="Alimentos">Alimentos</option>
                    <option value="Livros">Livros</option>
                    <option value="Outros">Outros</option>
                  </NativeSelect.Field>
                </NativeSelect.Root>
              </Box>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <Box w="100%" mt={10}>
                <FormLabel>Foto: </FormLabel>
                <Input
                  type="file"
                  name="fotoProduto"
                  placeholder="Foto do Produto"
                  onChange={setFotoProduto}
                />
              </Box>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <Box w="100%" mt={10}>
                <Button type="submit" rounded="md">
                  Salvar
                </Button>
              </Box>
            </FormControl>
          </Box>
*/
