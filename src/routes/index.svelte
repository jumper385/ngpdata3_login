<script>
  let formdata = {};
  let submitmessage = {
    status: "success",
    message: "Sign Up",
  };

  let onSubmit = async () => {
    let name = `${formdata.firstname} ${formdata.lastname}`;

    let submituser = await fetch("/apiv1/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formdata,
        name: name,
      }),
    });

    if (submituser.status == 200) {
      submitmessage = {
        status: "success",
        message: "success",
	  };
	  formdata = {}
    }
    if (submituser.status != 200) {
      let responsedata = await submituser.json();
      submitmessage = {
        status: "error",
        message: responsedata.message,
      };
	}
	
  };
</script>

<style>
  .pageTitle {
    text-align: center;
  }
  form {
    max-width: 300pt;
    margin: 0 auto;
  }
  .formfield input {
    -webkit-appearance: none;
    width: 100%;
    margin-bottom: 12pt;
    border: 1pt rgba(0, 0, 0, 0.12) solid;
    border-radius: 6pt;
    height: 24pt;
    padding: 6pt;
    box-sizing: border-box;
  }
  .formfield .formtitle {
    margin: 0;
    margin-left: 6pt;
    font-size: 9pt;
    color: rgba(0, 0, 0, 0.24);
    text-transform: lowercase;
    margin-bottom: 3pt;
  }
  .submitbutton {
    -webkit-appearance: none;
    width: 100%;
    margin: 0;
    padding: 0;
    height: 24pt;
    border: none;
    border-radius: 6pt;
    background: #3742fa;
    color: white;
    margin-top: 6pt;
  }
</style>

<h1 class="pageTitle">Sign Up to the NGP Project</h1>

<form on:submit|preventDefault={onSubmit}>
  <div class="formfield">
    <p class="formtitle">First Name</p>
    <input bind:value={formdata.firstname} required />
  </div>

  <div class="formfield">
    <p class="formtitle">Last Name</p>
    <input bind:value={formdata.lastname} required />
  </div>

  <div class="formfield">
    <p class="formtitle">E-Mail (This will be your Username)</p>
    <input
      bind:value={formdata.username}
      pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
      required />
  </div>

  <div class="formfield">
    <p class="formtitle">Password</p>
    <input bind:value={formdata.password} type="password" required />
  </div>

  <input
    style={`background:${submitmessage.status == 'error' ? '#ff4757' : '#2ed573'}`}
    class="submitbutton"
    type="submit"
    value={submitmessage.message} />
</form>
