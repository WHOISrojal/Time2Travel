<?php

require "vendor/autoload.php";

use GeminiAPI\Client;
use GeminiAPI\Resources\Parts\TextPart;

// Decode the JSON payload from the POST request
$data = json_decode(file_get_contents("php://input"));

// Check if the required data is present
if (!isset($data->place, $data->budget, $data->time)) {
    echo json_encode(["response" => "Error: Missing required fields."]);
    exit;
}

// Extract the input values
$place = $data->place;
$budget = $data->budget;
$time = $data->time;
$content = $data;

// Combine the inputs into a single text for the API
$text = "Place: $place, Budget: $budget, Time: $time. I want the response in tabular format with each day separated into activities, hotel, restaurant, price, in a table. Generate the content in HTML format using <table>, <tr>, and <td> tags.";

// Initialize the Gemini API client
try {
    $client = new Client("AIzaSyAHe0RaeqbUgrlj-HH6aetavya4LoHbn1k");

    // Send the request to the Gemini API
    $response = $client->geminiPro()->generateContent(
        new TextPart($text),
    );

    // Check if the response is valid
    if (isset($response) && method_exists($response, 'text')) {
        $responseText = $response->text();

        // Clean the response: Remove '''html and extra whitespace
        $cleanResponse = preg_replace('/^```html|```$/m', '', trim($responseText));

        // Return the cleaned data
        echo json_encode([
            "response" => [
                "Place" => $place,
                "Budget" => $budget,
                "Time" => $time,
                "Generated Content" => $cleanResponse, // Cleaned HTML content
            ]
        ]);
    } else {
        echo json_encode(["response" => "Error: Invalid response from Gemini API."]);
    }
} catch (Exception $e) {
    // Handle any errors
    echo json_encode(["response" => "Error: " . $e->getMessage()]);
}
