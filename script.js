function generateResponse() {
    const place = document.getElementById("place").value;
    const budget = document.getElementById("budget").value;
    const time = document.getElementById("time").value;

    const data = {
        place: place,
        budget: budget,
        time: time,
    };

    fetch("response.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // Get the response data
            const responseData = data.response;
            
            // Create the HTML table
            let tableHTML = "<table border='1' style='width:100%; text-align:left;'><tr><th>Place</th><th>Budget</th><th>Time</th><th>Generated Content</th></tr>";
            
            // Process the "Generated Content" for better readability
            const content = responseData['Generated Content'];
            const formattedContent = formatGeneratedContent(content);

            // Create table rows
            tableHTML += `<tr>
                            <td>${responseData.Place}</td>
                            <td>${responseData.Budget}</td>
                            <td>${responseData.Time}</td>
                            <td>${formattedContent}</td>
                          </tr>`;
            tableHTML += "</table>";

            // Insert the table into the response div
            document.getElementById("response").innerHTML = tableHTML;
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            document.getElementById("response").innerHTML =
                "An error occurred while processing your request.";
        });
}

function formatGeneratedContent(content) {
    // Parse the content and format it for readability
    let formattedContent = content
        .replace(/Day (\d+):/g, '<h3 style="margin-top:20px;">Day $1:</h3>') // Add a heading for each day
        .replace(/Activity:\s*([^\n]*)/g, '<b>Activity:</b> $1<br>') // Bold "Activity" and add line breaks
        .replace(/Hotel:\s*([^\n]*)/g, '<b>Hotel:</b> $1<br>') // Bold "Hotel" and add line breaks
        .replace(/Restaurant:\s*([^\n]*)/g, '<b>Restaurant:</b> $1<br>') // Bold "Restaurant" and add line breaks
        .replace(/Price:\s*([^\n]*)/g, '<b>Price:</b> $1<br>') // Bold "Price" and add line breaks
        .replace(/Total Estimated Cost:/g, '<h4>Total Estimated Cost:</h4>') // Add a heading for total cost
        .replace(/\n/g, '<br>'); // Replace any remaining newlines with <br> for spacing

    return formattedContent;
}
