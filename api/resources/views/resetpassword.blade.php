<!DOCTYPE html>
<html>
<head>
    <title>Nouveau mot de passe</title>
</head>
<body> 
    <p>Cliquez sur le lien ci-dessous ou copiez-le dans votre navigateur pour vous-reconnectez.
    <br />
    <br />
    Lien : {{ $mailData['lien'] }}
    <br />
    E-mail : {{ $mailData['email'] }}
    <br />
    Mot de passe : {{ $mailData['password'] }}
    <br />
    <br />
    Si vous n'avez pas demandé ce lien, vous pouvez ignorer cet e-mail.
    <br />
    <br />
    L'équipe My-hours</p>
</body>
</html>