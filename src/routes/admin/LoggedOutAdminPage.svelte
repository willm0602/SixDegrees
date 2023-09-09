<script>
// @ts-nocheck
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import { writable } from "svelte/store";

    let errorMessage = writable('');
    let errorMessageOpacity = 1;

    errorMessage.subscribe(() => {
        errorMessageOpacity = 1;

        const iterations = 1000;
        const time = 1000;

        const decreaseOpacity = (k) => {
            if(k > 0){
                errorMessageOpacity -= (1 / iterations);
                setTimeout(() => {
                    decreaseOpacity(k-1)
                }, (time / iterations));
            }
        }
        decreaseOpacity(iterations);
    })

</script>

<div class="center w-full h-full flex items-center">
    <form method="post" 
          action="/admin?/login"
          class="center w-full h-full flex flex-col justify-center items-center"
          use:enhance={() => {
            return async ({result}) => {
                if(!result.data.wasSet){
                    errorMessage.set('Invalid password please try again');
                }
                else{
                    window.location.reload();
                }
            }
          }}
    >
        <h1 class="h1 w-full text-center">Log In</h1>
        <span style="opacity: {errorMessageOpacity};">{$errorMessage}</span>
        <input class="input w-1/2 text-center mt-4" type="text" name="password" id="password" placeholder="Password">
        <button class="input w-1/2 text-center mt-4 btn cursor-pointer" type="submit" name="submit">Submit</button>
    </form>
</div>