<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat Bot</title>
</head>

<body>

    <h1>Chat Bot</h1>

    <label for="place">Place:</label><input type="text" id="place"> <br><br>
    <label for="budget">Budget:</label><input type="text" id="budget"> <br><br>
    <label for="time">Time:</label><input type="text" id="time"> <br><br>

    <button onclick="generateResponse();">Generate Response</button>

    <br><br>

    <div id="response"></div>

    <script src="script.js"></script>
</body>

</html>
