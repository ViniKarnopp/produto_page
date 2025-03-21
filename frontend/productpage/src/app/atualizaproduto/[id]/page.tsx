"use client";
import { UpdateProduct } from "@/EndPoints/UpdateProduct";
import { DetailProduct } from "@/EndPoints/DetailProduct";
import {
  Box,
  Button,
  Flex,
 Fieldset,
  Stack,
  Field
} from "@chakra-ui/react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { useRef, useState,useEffect } from "react";
import { InputField } from "@/components/form/inputfield";
import SelectField from "@/components/form/selectfield";
import ImageUploader from "@/components/form/imageuploader";
import { TextareaField } from "@/components/form/textareafield";
import { Flip, toast } from "react-toastify";
import { useParams } from "next/navigation";
import { ProductProps } from "@/app/listaprodutos/page";

//Schema para validação dos campos informados pelo usuário.
//Sendo os campos nome, preço e categoria obrigatórios. E o preço deve ser positivo.
const schema = Yup.object().shape({
  nome: Yup.string().required("Campo Obrigatório"),
  descricao: Yup.string(),
  preco: Yup.number().positive("O Valor deve ser positivo").required("Campo Obrigatório"),
  categoria: Yup.string().required("Campo Obrigatório"),
});

//Página de atualização de um produto. De acordo com o id informado na página de detalhes do produto.
export default function AtualizaProduto() {
  //Ref para o formulário. E estados utilizados para manter dados no formulário.
  const params = useParams();
  const id = params.id as string;
  const formRef = useRef<FormHandles>(null);
  const [categoria, setCategoria] = useState<string[]>([]);
  const [fotoProduto, setFotoProduto] = useState<string | undefined>("");
  const [fotoType, setFotoType] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductProps>();
  const [preco, setPreco] = useState<number>(0);

  //Efeito para carregar os dados do produto nos
  // campos do formulário de acordo com o id informado na página de detalhes do produto.
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await DetailProduct(id);
          setData(response);
          setCategoria([response?.Categoria]);
          setFotoProduto(response.ImageBase64);
          setFotoType(response.ImageType);
          setPreco(response?.Preco);
          formRef.current?.setData(formIni);
        } catch (err) {
          console.error("Error fetching product:", err);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [id]);

  //Dados iniciais para o formulário.
  const formIni = {
    nomeProduto: data?.Nome,
    precoProduto: data?.Preco,
    categoriaProduto: [data?.Categoria],
    descricaoProduto: data?.Descricao,
  };

  //Toast para exibir mensagem de erro ao cadastrar produto.
  const showToastError = (title: string, description: string) => {
    toast.error(
      () => (
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      ),
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Flip,
      }
    );
  };

  //Toast para exibir mensagem de sucesso ao cadastrar produto.
  const showToastSuccess = (title: string, description: string) => {
    toast.success(
      () => (
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      ),
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Flip,
      }
    );
  };

  //Função para atualizar o produto.
  async function Salvar(event: any) {
    //Atribuindo valores do input a váriaveis
    const nome = formRef.current?.getFieldValue("nomeProduto") as string;
    const categoria = formRef.current?.getFieldValue(
      "categoriaProduto"
    ) as string;
    const descricao = formRef.current?.getFieldValue(
      "descricaoProduto"
    ) as string;
    const body = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      categoria: categoria,
    };
    setLoading(true);
    //Validando os campos informados pelo usuário.
    try {
      await schema.validate(body, { abortEarly: false });
    } catch (err) {
      //Exibindo mensagem de erro caso o usuário não informou os campos obrigatórios.
      if (err instanceof Yup.ValidationError) {
        const errorMessages: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errorMessages[error.path] = error.message;
            if (error.path == "preco") {
              showToastError("Preço", error.message);
            } else if (error.path == "descricao") {
              showToastError("Descrição", error.message);
            } else {
              showToastError(error.path, error.message);
            }
          }
        });
        formRef.current?.setErrors(errorMessages);
        setLoading(false);
        return;
      }
    }

    //Função para atualizar o produto.
    try {
      UpdateProduct(
        Number(id),
        nome,
        descricao,
        preco ?? 0,
        categoria,
        fotoProduto,
        fotoType
      );
    } catch (error) {
      showToastError("Erro ao Salvar", "Erro ao salvar o produto");
      setLoading(false);
    } finally {
      showToastSuccess("Produto Salvo", "Produto salvo com sucesso");
      setLoading(false);
    }
    window.location.href = `/listaprodutos/${id}`;
    setLoading(false);
  }
  return (
    <Box height="100%" overflow="hidden">
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
          placeholder=""
          initialData={formIni}
          //onPointerEnterCapture={() => {}}
          //onPointerLeaveCapture={() => {}}
        >
          <Fieldset.Root
            borderWidth="1px"
            borderRadius="md"
            p="4"
            size="lg"
            maxW="md"
          >
            <Stack>
              <Fieldset.Legend fontWeight="bold">
                Atualização de Produtos
              </Fieldset.Legend>
            </Stack>

            <Fieldset.Content>
              <Field.Root>
                <InputField
                  type="text"
                  name="nomeProduto"
                  label="Nome"
                  placeholder="Nome do Produto"
                  borderWidth="1px"
                  borderRadius="md"
                  p="4"
                  width="250px"
                />
              </Field.Root>
              <Field.Root>
                <TextareaField
                  size="md"
                  resize="vertical"
                  name="descricaoProduto"
                  label="Descrição"
                  placeholder="Descrição do Produto"
                  borderWidth="1px"
                  borderRadius="md"
                  p="4"
                  width="250px"
                />
              </Field.Root>
              <Field.Root>
                <InputField
                  type="number"
                  name="precoProduto"
                  placeholder="Preço do Produto"
                  step={0.01}
                  label="Preço"
                  value={preco}
                  onChange={(e) => setPreco(parseFloat(e.target.value))}
                  borderWidth="1px"
                  borderRadius="md"
                  p="4"
                  width="250px"
                />
              </Field.Root>
              <Field.Root>
                <SelectField
                  name="categoriaProduto"
                  label="Categoria"
                  options={[
                    { label: "Eletrônico", value: "Eletrônico" },
                    { label: "Roupas", value: "Roupas" },
                    { label: "Alimentos", value: "Alimentos" },
                    { label: "Livros", value: "Livros" },
                    { label: "Outros", value: "Outros" },
                  ]}
                  value={categoria}
                  onChange={(e) => setCategoria([e.target.value[0]])}
                  borderWidth="1px"
                  p="4"
                  width="250px"
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Foto</Field.Label>
                <ImageUploader
                  value={fotoProduto}
                  type={fotoType}
                  setValue={setFotoProduto}
                  setType={setFotoType}
                  width="250px"
                />
              </Field.Root>
            </Fieldset.Content>
            <Button
              type="submit"
              alignSelf="flex-start"
              className="bg-zinc-900 text-white p-1 mt-2 rounded-md"
            >
              Salvar
            </Button>
          </Fieldset.Root>
        </Form>
      </Flex>
    </Box>
  );
}