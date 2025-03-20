import React, {
  useState,
  useRef,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import {
  Box,
  Image,
  Input,
  Text,
  VStack,
  Center,
} from "@chakra-ui/react";
import Compressor from "compressorjs";
import { FaPencilAlt, FaXing } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Flip, toast } from "react-toastify";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

//Componente que carrega a imagem e gera uma pré-visualização antes de enviar para o servidor.
const ImageUploader = ({
  width,
  value,
  type,
  setValue,
  setType,
}: {
  width?: string;
  value: string | undefined;
  type: string | undefined;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  setType: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const [preview, setPreview] = useState<string | undefined>(value);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
  const handleImageClick = () => {
    inputRef.current?.click();
  };

  //Função que valida o arquivo antes de comprimi-lo se ele tem o tipo de arquivo correto
  // e se o tamanho é menor que o limite máximo.
  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith("image/")) {
      showToastError(
        "Tipo de arquivo inválido!",
        "Por favor subir uma imagem no formato jpg ou png"
      );
      return false;
    } else {
      if (!file.type.startsWith("image/png")) {
        if (!file.type.startsWith("image/jpg")) {
          if (!file.type.startsWith("image/jpeg")) {
            showToastError(
              "Tipo de arquivo inválido!",
              "Por favor subir uma imagem no formato jpg ou png"
            );
            return false;
          }
        }
      }
      setType(file.type);
    }

    if (file.size > MAX_FILE_SIZE) {
      showToastError("Imagem muito grande", "Imagem precisa ser menor que 2MB");
      return false;
    }

    return true;
  };

  //Função que comprime a imagem e gera uma pré-visualização antes de enviar para o servidor.
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) {
      event.target.value = "";
      return;
    }

    setIsLoading(true);

    new Compressor(file, {
      quality: 0.8,
      maxWidth: 1920,
      success: (compressedFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = function () {
          if (reader.result) {
            setPreview(reader.result as string);
            setValue(reader.result as string);
            setType(file.type);
          }
          setIsLoading(false);
        };
      },
      error: (err) => {
        console.error(err);
        showToastError("Compression failed", "Failed to compress the image");
        setIsLoading(false);
      },
    });
  };

  return (
    <VStack /*spacing={4}*/ align="center">
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        display="none"
      />

      {preview ? (
        <Box cursor="pointer" position="relative">
          <Image
            src={preview}
            alt="Preview"
            width={width}
            height="auto"
            borderRadius="md"
            onClick={handleImageClick}
          />
          <Text
            position="absolute"
            bottom={2}
            onClick={handleImageClick}
            right={2}
            fontSize="sm"
            color="white"
            bg="blackAlpha.600"
            px={2}
            py={1}
            borderRadius="md"
          >
            <FaPencilAlt />
          </Text>
          {value && (
            <Text
              position="absolute"
              bottom={2}
              right={12}
              fontSize="sm"
              color="white"
              bg="blackAlpha.600"
              px={2}
              py={1}
              zIndex={10}
              borderRadius="md"
              onClick={(e) => {
                e.preventDefault();
                setValue(undefined);
                setPreview(undefined);
              }}
            >
              <IoClose />
            </Text>
          )}
        </Box>
      ) : (
        <Center
          border="2px dashed"
          borderColor="gray.300"
          borderRadius="md"
          w="100%"
          maxW="400px"
          h="200px"
          cursor="pointer"
          onClick={handleImageClick}
          _hover={{ borderColor: "blue.500" }}
        >
          <Text color="gray.500">
            {isLoading
              ? "Processando..."
              : "Clique para fazer upload da imagem"}
          </Text>
        </Center>
      )}
    </VStack>
  );
};

export default ImageUploader;
