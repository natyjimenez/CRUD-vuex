<template>
  <div id="app">
    <!-- Template Modal "Editar" -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <table>
              <tr>
                <td>Nombre</td>
                <td><input v-model="nameEdit" type="text" /></td>
              </tr>
              <tr>
                <td>Email</td>
                <td><input v-model="emailEdit" type="text" /></td>
              </tr>
              <button @click="update" class="btn btn-primary">Editar</button>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- Sección "Agregar" -->
    <table class="addTable">
      <tr>
        <td>Nombre</td>
        <td><input v-model="name" type="text" /></td>
      </tr>
      <tr>
        <td>Email</td>
        <td><input v-model="email" type="text" /></td>
      </tr>
      <button @click="create" class="btnAdd btn btn-primary">Agregar</button>
    </table>

    <!-- Tabla que muestra datos ingresados -->
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in users" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ user.data.name }}</td>
          <td>{{ user.data.email }}</td>
          <td>
            <button
              data-toggle="modal"
              data-target="#exampleModal"
              @click="setInformation(user.data.name, user.data.email, user.id)"
              class="btnEdit btn btn-primary"
            >
              Editar
            </button>
            <button @click="Delete(user.id)" class="btnDelete btn btn-danger">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      loading: true,
      users: [],
      name: "",
      email: "",
      nameEdit: "",
      emailEdit: "",
      idEdit: "",
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    setInformation(name, email, id) {
      this.nameEdit = name;
      this.emailEdit = email;
      this.idEdit = id;
    },
    // Leer Data
    read() {
      firebase
        .firestore()
        .collection("users")
        .onSnapshot((snapshot) => {
          this.users = [];
          snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            this.users.push({
              id: doc.id,
              data: doc.data(),
            });
          });
        });
    },
    // Crear Data
    create() {
      firebase
        .firestore()
        .collection("users")
        .add({
          name: this.name,
          email: this.email,
        })
        .then(() => {
          snapshot.forEach((doc) => {
            console.log("data enviada");
          });
        });
    },
    // Editar Data
    update() {
      firebase
        .firestore()
        .collection("users")
        .doc(this.idEdit)
        .update({
          name: this.nameEdit,
          email: this.emailEdit,
        })
        .then(() => {
          console.log("Data enviada");
        });
    },
    // Eliminar Data
    Delete(id) {
      firebase
        .firestore()
        .collection("users")
        .doc(id)
        .delete();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.modal-body {
  display: flex;
  align-items: center;
}
.addTable {
  margin-top: 50px;
  margin-bottom: 50px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.btnEdit {
  margin-right: 5px;
  padding-left: 20px !important;
  padding-right: 20px !important;
}
.btnDelete {
  margin-right: 5px;
}
</style>
