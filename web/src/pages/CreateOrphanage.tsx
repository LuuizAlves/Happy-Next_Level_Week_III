import React, {useState, useEffect, FormEvent, ChangeEvent} from "react";
import { Map, Marker, TileLayer,  } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from 'react-router-dom';

import { FiPlus } from "react-icons/fi";

import Sidebar from '../components/Sidebar';
import happyMapIcon from '../utils/HappyMapIcon';

import '../styles/pages/create-orphanage.css';

import api from '../services/api';

export default function CreateOrphanage() {
  const history = useHistory();

  const [ position, setPosition] = useState({latitude: 0, longitude: 0});

  const [ name, setName ] = useState('');
  const [ about, setAbout ] = useState('');
  const [ instructions, setInstructions ] = useState('');
  const [ opening_hours, setOpeningHours ] = useState('');
  const [ open_on_weekends, setOpenWeekends ] = useState(true);

  //ARMAZENAMENTO DE MÚLTIPLOS FILES EM UMA VARIÁVEL
  const [ images, setImages ] = useState<File[]>([]);

  //VARIÁVEL QUE VAI ARMAZENAR AS URLS DO PREVIEW DE IMAGENS SELECIONADAS
  const [ previewImage, setPreviewImage ] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng} = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>){
    //VERIFICAÇÃO SE ALGUM ARQUIVO JÁ FOI SELECIONADO
    if(!event.target.files) return;

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImage(selectedImagesPreview);

  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');

  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-3.0801316,-60.0242447]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker 
                  interactive={false}
                  icon={happyMapIcon}
                  position={[position.latitude,position.longitude]}
                />)
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImage.map(image => {
                  return(
                    <img key={image} src={image} alt={name} />
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input onChange={handleSelectImage} multiple type="file" id="image[]"/>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Abertura</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button"
                  className={open_on_weekends ? "active" : ''}
                  onClick={() => setOpenWeekends(true)}
                >
                  Sim
                </button>

                <button
                 type="button"
                 className={!open_on_weekends ? "active" : ''}
                 onClick={() => setOpenWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit" onClick={handleSubmit}>
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
