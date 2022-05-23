exports.passwordGenerator = () =>{
    const pass = Math.random().toString(36).slice(-8);
    console.log(pass)
    return pass
}