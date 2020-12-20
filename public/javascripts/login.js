function check_input()
{
    if (!document.login_form.userid.value)
    {
        alert("아이디를 입력하세요");    
        document.login_form.userid.focus();
        return;
    }

    if (!document.login_form.passwd.value)
    {
        alert("비밀번호를 입력하세요");    
        document.login_form.passwd.focus();
        return;
    }
    document.login_form.submit();
}