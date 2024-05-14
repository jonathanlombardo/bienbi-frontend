<script>
import axios from "axios";
import { api } from "../store";
import TomTomMap from "./TomTomMap.vue";

export default {
  data() {
    return {
      appartment: false,
      UIname: "",
      UIlast_name: "",
      UImail: "",
      body: "",
      feedbackMessage: "",
      message: false,
    };
  },

  components: { TomTomMap },
  methods: {
    fetchAppartmentDetails(endpoint = api.baseUrl + "appartments/" + this.$route.params.appartmentSlug) {
      axios.get(endpoint).then((response) => {
        console.log(response);
        this.appartment = response.data;
        this.appartment.lat = parseFloat(this.appartment.lat);
        this.appartment.long = parseFloat(this.appartment.long);
      });
    },

    sendMessage(endpoint = api.baseUrl + "messages") {
      const params = {};
      params.id = this.appartment.id;
      params.first_name = this.UIname;
      params.last_name = this.UIlast_name;
      params.mail = this.UImail;
      params.body = this.body;
      console.log(params);
      console.log(endpoint);

      axios.post(endpoint, params).then((response) => {
        this.message = response.data;
        let nameError = document.getElementById("nameError");
        let lastNameError = document.getElementById("lastNameError");
        let emailError = document.getElementById("emailError");
        let messageError = document.getElementById("messageError");

        let isValid = true;
        console.log(this.message);
        if (this.message.response) {
          this.feedbackMessage = 'Messaggio inviato correttamente';
          this.UIname = '';
          this.UIlast_name = '';
          this.UImail = '';
          this.body = '';
          setTimeout(() => {
            this.feedbackMessage = ''
          }, 1500)
        } else {
          console.log(this.message.message);
          if (this.message.message == "name") {
            nameError.style.display = "block";
            isValid = false;
          } else {
            nameError.style.display = "none";
          }

          if (this.message.message == "lastname") {
            lastNameError.style.display = "block";
            isValid = false;
          } else {
            lastNameError.style.display = "none";
          }

          if (this.message.message == "mail") {
            emailError.style.display = "block";
            isValid = false;
          } else {
            emailError.style.display = "none";
          }

          if (this.message.message == "body") {
            messageError.style.display = "block";
            isValid = false;
          } else {
            messageError.style.display = "none";
          }
        }
      });
    },

    validateForm() {
      let name = document.getElementById("name").value;
      let lastName = document.getElementById("last_name").value;
      let email = document.getElementById("email").value;
      let emailArray = email.split("");
      let body = document.getElementById("body").value;

      let nameError = document.getElementById("nameError");
      let lastNameError = document.getElementById("lastNameError");
      let emailError = document.getElementById("emailError");
      let messageError = document.getElementById("messageError");

      let isValid = true;

      if (name === "") {
        nameError.style.display = "block";
        isValid = false;
      } else {
        nameError.style.display = "none";
      }

      if (lastName === "") {
        lastNameError.style.display = "block";
        isValid = false;
      } else {
        lastNameError.style.display = "none";
      }

      let atPosition = false;
      let dotPosition = false;

      for (let i = 0; i < email.length; i++) {
        if (email[i] == "@") atPosition = i;
        if (email[i] == ".") dotPosition = i;
      }
      console.log(atPosition, dotPosition);
      if (!email || !atPosition || !dotPosition || dotPosition < atPosition) {
        emailError.style.display = "block";
        isValid = false;
        console.log(isValid);
        console.log(emailArray);
      } else {
        emailError.style.display = "none";
        console.log(isValid);
      }

      if (body === "") {
        messageError.style.display = "block";
        isValid = false;
      } else {
        messageError.style.display = "none";
      }

      if (isValid) {
        // Invia il form solo se tutti i campi sono validi
        // document.getElementById("myForm").submit();
        this.sendMessage();
      }
    },

    handleMessageClick() {
      document.getElementById("nameError").style.display = 'none';
      document.getElementById("lastNameError").style.display = 'none';
      document.getElementById("emailError").style.display = 'none';
      document.getElementById("messageError").style.display = 'none';
      this.feedbackMessage = '';
    }
  },

  created() {
    this.fetchAppartmentDetails();
    // console.log(this.appartment);
  },
};
</script>

<template>
  <section class="pb-4" v-if="appartment">
    <div class="container m-auto p-0 p-md-1 vw-100 my-container rounded position-relative overflow-y-scroll overflow-x-hidden">
      <div class="d-flex justify-content-center mb-3">
        <div class="text-start">
          <h2 class="text-center show_title m-0">{{ appartment.title }}</h2>
          <div><i>di {{ appartment ? appartment.user.name + " " +
            appartment.user.last_name : "" }}</i>
          </div>
        </div>
      </div>
      <!-- <TomTomMap class="map mb-4" v-if="appartment" :lat="appartment.lat" :long="appartment.long" /> -->
      <div class="row flex-column flex-md-row">
        <div class="col-12 col-md-6">
          <div class="">
            <img :src="appartment ? appartment.imgUrl : ''" alt="" class="appartment-img" />
          </div>
        </div>

        <div class="col-12 col-md-6 mt-3 mt-md-0">
          <TomTomMap class="map" v-if="appartment" :lat="appartment.lat" :long="appartment.long" />
          <div class="mb-2 opacity-75">{{ appartment.address }}</div>
        </div>

        <div class="col-12 p-3">
          <div class="row align-items-start justify-content-center h-100">
            <div class="col-12 col-lg-6">
              <div class="row">
                <div class="col-6 px-2">
                  <div class="rooms_container">
                    <img src="/img/stanze.png" alt="" class="w-100 p-3" />
                    <div class="text-center"><strong>Stanze: </strong>{{ appartment.rooms }}</div>
                  </div>
                </div>

                <div class="col-6 px-2">
                  <div class="rooms_container">
                    <img src="/img/letti.png" alt="" class="w-100 p-3" />
                    <div class="text-center"><strong>Letti: </strong>{{ appartment.beds }}</div>
                  </div>
                </div>

                <div class="col-6 px-2">
                  <div class="rooms_container">
                    <img src="/img/bagni.png" alt="" class="w-100 p-3" />
                    <div class="text-center"><strong>Bagni: </strong>{{ appartment.bathrooms }}</div>
                  </div>
                </div>

                <div class="col-6 px-2">
                  <div class="rooms_container">
                    <img src="/img/mq.png" alt="" class="w-100 p-3" />
                    <div class="text-center"><strong>Mq: </strong>{{ appartment.square_meters }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-6">
              <div class="row flex-column justify-content-start">
                <div class="col-12">
                  <strong class="me-1">Servizi: </strong>
                  <ul class="row flex-md-wrap p-0 m-0">
                    <li v-for="service in appartment.services" class="col-6 d-flex align-items-center my-3 p-0">
                      <i :class="service.faIconClass" class="px-1 me-2 fs-4"></i><span class="service_label me-1">{{
                        service.label }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- trigger button -->
      <button class="btn my_btn btn-message position-fixed d-lg-none" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" @click="handleMessageClick()">
        <i class="fa-regular fa-message"></i>
      </button>

      <div class="d-flex justify-content-end m-3">
        <button class="btn my_btn d-none d-lg-inline" type="button" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" @click="handleMessageClick()">
          <i class="fa-regular fa-message"></i>
        </button>
      </div>
     
      <!-- offcanvas -->
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header justify-content-between">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Invia un messaggio al proprietario</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div class="row g-1">
          <!-- <img src="/img/appartment_placeholder.jpg" alt="" class="img-fluid"> -->
          <div class="text-center my-1" v-if="appartment">
            <strong>Proprietario: </strong>
            {{ appartment.user.name }}
            {{ appartment.user.last_name }}
          </div>
        </div>

        <div :class="feedbackMessage ? 'd-none' : 'd-block'">
          <div class="offcanvas-body p-3">
            <div>
              <div class="mb-4 font_size">Tutti i campi contrasseganti con * sono obbligatori.</div>
              <!-- form di contatto -->
              <form class="form-text">
                <div class="d-flex gap-4">
                  <div>
                    <label for="name" class="form-label">Nome*</label>
                    <input v-model="UIname" type="name" class="form-control" id="name" placeholder="Nome" />
                    <div id="nameError" class="error text-danger ms-1" style="display: none">Inserisci il tuo nome</div>
                  </div>

                  <div>
                    <label for="last_name" class="form-label">Cognome*</label>
                    <input v-model="UIlast_name" type="last_name" class="form-control" id="last_name"
                      placeholder="Cognome" />
                    <div id="lastNameError" class="error text-danger ms-1" style="display: none">Inserisci il tuo
                      cognome</div>
                  </div>
                </div>

                <div class="my-4">
                  <label for="email" class="form-label">Email*</label>
                  <input v-model="UImail" type="text" class="form-control" id="email" placeholder="Email" />
                  <div id="emailError" class="error text-danger ms-1" style="display: none">Inserisci la mail</div>
                </div>

                <div class="mt-2">
                  <label for="body" class="form-label">Messaggio*</label>
                  <textarea v-model="body" class="form-control" id="body" rows="3"
                    placeholder="Scrivi il tuo messaggio..."></textarea>
                  <div id="messageError" class="error text-danger ms-1" style="display: none">Inserisci il messaggio
                  </div>
                </div>

                <div class="mt-3">
                  <button class="btn my_btn" type="button" @click="validateForm()">Invia</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div :class="feedbackMessage ? 'd-flex flex-column align-items-center my-4' : 'd-none'">
          <div class="mx-3">
            <div class="fw-bold fs-2 text-center">Messaggio inviato correttamente</div>
          </div>
          <div class="icona">
            <i class="fa-solid fa-envelope-circle-check"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.service-container {
  height: 300px;
}

.map {
  width: 100%;
  height: 350px;
  // aspect-ratio: 16/9;
}

.my-container {
  background-color: #f3f3f3;
  border: none;
  padding: 15px;
}

.show_title {
  background: linear-gradient(90deg, #e9d6ab 10%, #ffb30e 48%, #f34e39 97%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: bold;
}

.appartment-img {
  border-radius: 10px;
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  object-position: center;
}

.rooms_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #c85f5f;
  margin-bottom: 10px;
  padding: 20px;
  max-height: 115px;
  min-height: 115px;

  img {
    min-width: 60px;
    max-width: 80px;
  }
}

.service_label {
  color: #000000;
  opacity: 1;
}

.btn-message {
  bottom: 4%;
  right: 4%;
  border-radius: 50%;
  width: 65px;
  height: 65px;
}

.font_size {
  font-size: 0.9rem;
}

.error {
  font-size: 0.7rem;
}

.form.text {
  height: 100px;
}

.icona {
  font-size: 10rem;
  color: green;
}

.fa-message{
  font-size: 1.6rem;
}
</style>
