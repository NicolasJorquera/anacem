'use client'

import ImageTopCard from "./components/ImageTopCard";
import Image from 'next/image';
import Select from "./components/Select";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { atentionTypes, services } from "./data";


export default function Home() {

  const [selectedAttentionType, setSelectedAttentionType] = useState<string>('presencial');
  const [selectedService, setSelectedService] = useState<string>('');

  // Estados de región/comuna
  const [regionOptions, setRegionOptions] = useState<{ label: string; value: string }[]>([]);
  const [communeOptions, setCommuneOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCommune, setSelectedCommune] = useState<string>('');

  useEffect(() => {
    fetch('/api/regions')
      .then(res => res.json())
      .then((data: { nombre: string; codigo: string }[]) => {
        setRegionOptions(data.map(r => ({ label: r.nombre, value: r.codigo })));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedRegion) return;
    fetch(`/api/regions/${selectedRegion}/communes`)
      .then(res => res.json())
      .then((data: { nombre: string; codigo: string }[]) => {
        setCommuneOptions(data.map(c => ({ label: c.nombre, value: c.codigo })));
      })
      .catch(console.error);
  }, [selectedRegion]);

  return (
    <div className="md:mx-20 flex flex-col items-center justify-center">
      <div className="m-10 mt-30 max-w-5xl justify-center text-center items-center flex flex-col">
        <div className="grid gap-7 text-center mb-15">
          <p className="text-4xl">
            ANACEM
          </p>
          <p className="text-3xl font-bold">
            Asociación Nacional Científica de Estudiantes de Medicina de Chile
          </p>
        </div>
        <div className="grid gap-5 max-w-2xl justify-center text-center">
          <p className="text-justify">
            Fundada oficialmente en 1994, surgió a partir de la iniciativa de estudiantes de
            varias universidades chilenas, aunque sus raíces datan de 1978 con el primer
            Congreso Científico de Estudiantes de Medicina. Su misión es promover y difundir
            la investigación médica desde el pregrado, fomentando la colaboración entre
            sociedades estudiantiles y creando espacios para el intercambio académico y la
            difusión de investigaciones en ciencias biomédicas.
          </p>
          <Link href="/about-us" >
            <button className="bg-[var(--color-foreground)] text-[var(--color-background)] px-4 py-2 rounded-full w-fit justify-self-center cursor-pointer">
              Saber más
            </button>
          </Link>

        </div>

      </div>
      <div className="my-10 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center md:mx-0 mx-4">
          <ImageTopCard
            className="w-full"
            imageSrc="/images/universities-1.webp"
            title="25+"
            description="Universidades adscritas"
            buttonText="Saber más"
            onButtonClick={() => alert('Profesionales para tus proyectos de construcción. Desde arquitectos hasta ingenieros civiles.')}
          />
          <ImageTopCard
            className="w-full"
            imageSrc="/images/students-1.webp"
            title="3000+"
            description="Estudiantes beneficiados"
            buttonText="Saber más"
            onButtonClick={() => alert('Encuentra médicos, dentistas y psicólogos para cuidar de ti y tu familia.')}
          />
          <ImageTopCard
            className="w-full"
            imageSrc="/images/congress-1.webp"
            title="70+"
            description="Congresos científicos concretados"
            buttonText="Saber más"
            onButtonClick={() => alert('Abogados especializados en diversas áreas del derecho para asesorarte y representarte.')}
          />
        </div>

      </div>
      <div className="flex my-10 text-center justify-center">
        <div className="md:ml-20 ml-2 flex flex-col justify-center sm:pr-10 pr-2 items-center">
          <h1 className="md:text-4xl text-3xl font-bold mb-6">¿Quieres participar?</h1>
          <p className="text-lg mb-8">
            Si eres estudiante de medicina y quieres formar parte de la asociación, o si eres
            una institución que desea ofrecer servicios a través de nuestra red, no dudes en
            contactarnos.
          </p>
          <button className="bg-[var(--color-foreground)] text-[var(--color-background)] px-6 py-3 rounded-full w-fit cursor-pointer">
            <p>Contactar</p>
          </button>
        </div>

        <div className="md:mr-20 mr-2 sm:flex hidden w-full relative h-[400px]">
          <Image
            src={"/images/professional-4.webp"}
            alt={"Imagen de médico"}
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}

