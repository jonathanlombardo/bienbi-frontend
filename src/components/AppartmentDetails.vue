<script>
import axios from "axios";
import { api } from "../store";

export default {
  data() {
    return {
      appartment: false,
      UIname: '',
      UIlast_name: '',
      UImail: '',
      message: '',
      feedbackMessage: '',

    };
  },
  methods: {
    fetchAppartmentDetails(
      endpoint = api.baseUrl +
        "appartments/" +
        this.$route.params.appartmentSlug
    ) {
      axios.get(endpoint).then((response) => {
        console.log(response);
        this.appartment = response.data;
      });
    },

    sendMessage(endpoint = api.baseUrl + "messages"){

      const params = {};
      params.id = this.appartment.id
      params.first_name = this.UIname
      params.last_name = this.UIlast_name
      params.mail = this.UImail
      params.body = this.message
      console.log(params)
      console.log(endpoint)

      axios.post(endpoint, params).then((response) =>{
        console.log(response.data)
        if(response.data.response){
          this.feedbackMessage = 'Messaggio inviato correttamente',
          this.UIname = '',
          this.UIlast_name = '',
          this.UImail = '',
          this.message = ''
        }
      })
    },

    validateForm() {
      let name = document.getElementById("name").value;
      let lastName = document.getElementById("last_name").value;
      let email = document.getElementById("email").value;
      let message = document.getElementById("message").value;

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

      if (email === "") {
          emailError.style.display = "block";
          isValid = false;
      } else {
          emailError.style.display = "none";
      }

      if (message === "") {
          messageError.style.display = "block";
          isValid = false;
      } else {
          messageError.style.display = "none";
      }

      if (isValid) {
          // Invia il form solo se tutti i campi sono validi
          document.getElementById("myForm").submit();
      }
    }
  },

  created() {
    this.fetchAppartmentDetails();
    // console.log(this.appartment);
  },
};
</script>

<template>
  <section class="pb-4">

    <div class="container my-container rounded position-relative">

      <h2 class="text-center mb-4 show_title">{{ appartment.title }}</h2>

      <div class="row flex-column flex-md-row">

        <div class="col-12 col-md-6 ">
          <div class="">
            <img src="/img/appartment_placeholder.jpg" alt="" class="w-100 rounded">
          </div>
        </div>

        <div class="col-12 col-md-6 mt-3 mt-md-0">
          <div class="row align-items-center justify-content-center">
            <div class="col-3 px-2">
              <div class="rooms_container">
                <img src="/img/stanze.png" alt="" class="w-100 p-3">
                <div class="text-center"><strong>Stanze: </strong>{{ appartment.rooms }}</div>
              </div>
            </div>
            <div class="col-3 px-2">
              <div class="rooms_container">
                <img src="/img/letti.png" alt="" class="w-100 p-3">
                <div class="text-center"><strong>Letti: </strong>{{ appartment.beds }}</div>

              </div>
            </div>
            <div class="col-3 px-2">
              <div class="rooms_container">
                <img src="/img/bagni.png" alt="" class="w-100 p-3">
                <div class="text-center"><strong>Bagni: </strong>{{ appartment.bathrooms }}</div>

              </div>
            </div>
            <div class="col-3 px-2">
              <div class="rooms_container">
                <img src="/img/mq.png" alt="" class="w-100 p-3">
                <div class="text-center"><strong>Mq: </strong>{{ appartment.square_meters }}</div>

              </div>
            </div>
          </div>
          <div class="my-3"><strong class="me-1">Indirizzo: </strong>{{ appartment.address }}</div>

          <div class="my-3">
            <strong class="me-1">Proprietario: </strong>{{ appartment ? appartment.user.name + ' ' +
              appartment.user.last_name : '' }}
          </div>

          <div class="my-3">
            <strong class="me-1">Servizi: </strong>
            <div v-for="service in appartment.services" class="d-flex align-items-center"><i
                :class="service.faIconClass" class="px-1 me-2"></i><span class="service_label me-1">{{ service.label
                }}</span></div>
          </div>

        </div>


      </div>

      <!-- trigger button -->

      <button class="btn my_btn btn-message position-absolute" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <i class="fa-regular fa-message"></i>
      </button>

      <!-- offcanvas -->
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header justify-content-between">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Invia un messaggio al proprietario</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="d-flex align-items-center flex-column">
          <div>
            <img src="/public/img/appartment_placeholder.jpg" alt="" class="off_image">
          </div>
          <div class="mt-3">
            <strong>Proprietario: </strong>
            {{ appartment.user.name }}
            {{ appartment.user.last_name }}
          </div>
        </div>
        <div :class="feedbackMessage ? 'd-none' : 'd-block'">
          
          <div class="offcanvas-body">
            <div>
              <div class="mb-3 font_size"> 
                Tutti i campi contrasseganti con * sono obbligatori.
              </div>
              <!-- form di contatto -->
              <form>
                <div class="mb-3 d-flex gap-4">
                  <div>
                    <label for="name" class="form-label">Nome*</label>
                    <input v-model="UIname" type="name" class="form-control" id="name" placeholder="Nome">
                    <div id="nameError" class="error text-danger ms-1" style="display: none;">Inserisci il tuo nome</div>
                  </div>
                  <div>
                    <label for="last_name" class="form-label">Cognome*</label>
                    <input v-model="UIlast_name" type="last_name" class="form-control" id="last_name" placeholder="Cognome">
                    <div id="lastNameError" class="error text-danger ms-1" style="display: none;">Inserisci il tuo cognome</div>
                  </div>
                </div>
    
    
                <div class="mb-3">
                  <label for="email" class="form-label">Email*</label>
                  <input v-model="UImail" type="email" class="form-control" id="email" placeholder="Email">
                  <div id="emailError" class="error text-danger ms-1" style="display: none;">Inserisci la mail</div>
                </div>
    
                <div class="mb-3">
                  <label for="message" class="form-label">Messaggio*</label>
                  <textarea v-model="message" class="form-control" id="message" rows="3" placeholder="Scrivi il tuo messaggio..."></textarea>
                  <div id="messageError" class="error text-danger ms-1" style="display: none;">Inserisci il messaggio</div>
                </div>
    
                <!-- <div class="alert">
                  {{ feedbackMessage }}
                </div> -->
    
                <div class="mt-3">
                  <button class="btn my_btn" type="button" @click="sendMessage(), validateForm()">
                    Invia
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.my-container {
  background-color: rgb(243, 243, 243);
  border: none;
  padding: 15px;
}

.show_title {
  background: linear-gradient(90deg, rgb(233, 214, 171) 10%, rgb(255, 179, 14) 48%, rgb(243, 78, 57) 97%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bold;
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
  color: black;
  opacity: 1;
}

.btn-message {
  bottom: 5%;
  right: 3%;
}

.font_size {
  font-size: 0.9rem;
}

.error {
  font-size: 0.8rem;
}

.off_image {
  width: 200px;
}
</style>
