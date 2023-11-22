var region = "ap-south-1"
var accessKeyId = "AKIAWEIHDT6G3CP3MJVE"
var secretAccessKey = "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"

AWS.config.update({
    region: region,
    credentials: new AWS.Credentials(accessKeyId, secretAccessKey)

});

var s3 = new AWS.S3()

function refreshFileList(bucketname) {
    var tableBody = document.querySelector("#fileTable tbody");
    tableBody.innerHTML = "";

    s3.listObjectsV2({ Bucket: bucketname }, (err, data) => {
        if (err) {
            console.log("Error fetching file list", err)
        }
        else {
            data.Contents.forEach((object) => {
                var fileRow = document.createElement('tr');
                var fileNameCell = document.createElement('td');
                fileNameCell.textContent = object.Key;
                fileRow.appendChild(fileNameCell);

                var fileSizeCell = document.createElement('td');
                fileSizeCell.textContent = object.Size;
                fileRow.appendChild(fileSizeCell);

                var downloadCell = document.createElement('td');
                var downloadLink = document.createElement('a');
                downloadLink.href = s3.getSignedUrl("getObject", {
                    Bucket: bucketname,
                    Key: object.Key,
                });
                downloadLink.textContent = "Download"
                downloadCell.appendChild(downloadLink)
                fileRow.appendChild(downloadCell)

                var deleteCell = document.createElement('td');
                var deleteButton = document.createElement('button');
                deleteButton.textContent = "Delete"
                deleteButton.addEventListener('click', () => {
                    deleteFile(bucketname, object.key)
                })

                deleteCell.appendChild(deleteButton)
                fileRow.appendChild(deleteCell)

                tableBody.appendChild(fileRow)

            });
            console.log(data)
        }
    });
}

function uploadFile(bucketname) {
    let files = document.getElementById('fileInput').files

    var fileCount = files.length

    for (var i = 0; i < fileCount; i++) {
        var file = files[i];
        var params = {
            Bucket: bucketname,
            Key: file.name,
            Body: file
        }
        s3.upload(params, (err, data) => {
            console.log("file uploaded")
            refreshFileList(bucketname)
        })
    }
}

function deleteFile(bucketname, key) {
    var params = {
        Bucket: bucketname,
        Key: key
    }
    s3.deleteObject(params, (err, data) => {
        console.log("file deleted sucessfully", data);
        refreshFileList(bucketname);
    });

}
refreshFileList("nest000")
