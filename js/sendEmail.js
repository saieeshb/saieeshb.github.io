function Email(); {
    document.getElementById("clickMe").onclick = Email();
    window.open('mailto:test@example.com?subject=subject&body=body');
}