require('dotenv').config({
    path: 'variables.env'
})

var sql = require("mssql");
const slugify = str => {
    //replace all special characters | symbols with a space
    str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase();

    // trim spaces at start and end of string
    str = str.replace(/^\s+|\s+$/gm, '');

    // replace space with dash/hyphen
    str = str.replace(/\s+/g, '-');

    return str;

}
const S3 = require('aws-sdk/clients/s3')
var request = require('request');
var config = {
    user: 'haberNewsUser',
    password: 'Aa24002400__',
    server: '213.159.7.152',
    database: 'edershan_haber_news',
    encrypt: false
};

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

const Posts = require('./Models/posts')
const Post = Posts.Post

const AfterID = [];

const currentID = [
    '143839', '143733', '143661', '143697', '143804', '143760',
    '143812', '143781', '143642', '143788', '143716', '143754',
    '143734', '143745', '143745', '143785', '143751', '143813',
    '143531', '143681', '143760', '143636', '143693', '143779',
    '143714', '143770', '143681', '143681', '143693', '143694',
    '143694', '143711', '143714', '143716', '143734', '143716',
    '143717', '143718', '143693', '143694', '143841', '143843',
    '143699', '143736', '143737', '143813', '143752', '143771',
    '143746', '143777', '143769', '143828', '143830', '143627',
    '143707', '143781', '143748', '143788', '143841', '143771',
    '143842', '143804', '143837', '143590', '143591', '143600',
    '143641', '143650', '143756', '143813', '143746', '143828',
    '143830', '143699', '143787', '143734', '143788', '143754',
    '143737', '143699', '143784', '143736', '143733', '143774',
    '143736', '143737', '143661', '143697', '143770', '143704',
    '143704', '143843', '143842', '143702'
];

const uploadFile = (url, title, callback) => {
    request({
        url: url,
        encoding: null
    }, function (err, res, body) {
        if (err)
            return callback(err, res);
        s3.putObject({
            Bucket: bucketName,
            Key: title + ".jpg",
            ContentType: res.headers['content-type'],
            ContentLength: res.headers['content-length'],
            Body: body // buffer
        }, callback);
    })
}


sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('select TOP 200 * from haberler order by ID desc', function (err, recordset) {

        if (err) console.log(err)

        // send records as a response
        //Fetch Image
        recordset.recordset = recordset.recordset.reverse();
        for (let i = 0; i < recordset.recordset.length; i++) {
            startProcess(recordset.recordset[i])
        }

    });
});

// sql.connect(config, function (err) {

//     if (err) console.log(err);

//     currentID.forEach(C => {
//         // create Request object
//         var request = new sql.Request();

//         // query to the database and get the records
//         request.query('select * from haberler where ID=' + C, function (err, recordset) {

//             if (err) console.log(err)

//             // send records as a response
//             //Fetch Image
//             if (!recordset.recordset.length) return;
//             startProcess(recordset.recordset[0])



//         });
//     })


// });



function startProcess(Record) {
    console.log(Record.haber_thumb_url)
    uploadFile("http://defensehere.com" + Record.haber_thumb_url, slugify(Record.baslik), function (err, res) {
        if (err)
            throw err;

        console.log('Uploaded data successfully!');
        pushToDb(Record);
    });

}

function pushToDb(Record) {
    let HaberTRLink = "";
    let HaberENLink = "";
    let HaberARLink = "";
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('select * from haberler where ID=' + Record.haberTRID + ' order by ID desc', function (err, recordset) {

            if (recordset.recordset.length) {
                HaberTRLink = slugify(recordset.recordset[0].baslik);
                AfterID.push(Record.haberTRID);
            }

            // query to the database and get the records
            request.query('select * from haberler where ID=' + Record.haberENGID + ' order by ID desc', function (err, recordset) {

                if (recordset.recordset.length) {
                    HaberENLink = slugify(recordset.recordset[0].baslik);
                    AfterID.push(Record.haberENGID);
                }

                // query to the database and get the records
                request.query('select * from haberler where ID=' + Record.haberARID + ' order by ID desc', function (err, recordset) {

                    if (recordset.recordset.length) {
                        HaberARLink = slugify(recordset.recordset[0].baslik);
                        AfterID.push(Record.haberARID);
                    }

                    request.query('select * from haberHitSayilar where newsID=' + Record.ID + ' order by ID desc', async function (err, recordset) {
                        var Views = 0;
                        if (recordset.recordset.length) {
                            Views = recordset.recordset[0].gosterim
                        }

                        const TotalPosts = await Post.countDocuments()
                        const NewPost = new Post({
                            owner: "info@defensehere.com",
                            ownerEmail: "info@defensehere.com",
                            content: Record.icerik,
                            categories: [Record.kategori],
                            postTitle: Record.baslik,
                            topic: Record.kategori,
                            postImage: slugify(Record.baslik) + ".jpg",
                            postKeywords: Record.etiketler,
                            postCustomUrl: "",
                            postSeoWords: Record.etiketler,
                            postSeoUrl: slugify(Record.baslik),
                            postSeoHeader: Record.baslik,
                            publishDate: Record.eklenmeTarihi,
                            publishHour: "18:00",
                            postEnglishLink: HaberENLink,
                            postArabicLink: HaberARLink,
                            postRussianLink: "",
                            postUkranianLink: "",
                            postFrenchLink: "",
                            postTurkishLink: HaberTRLink,
                            postLanguage: Record.lang.substr(0, 2),
                            tags: Record.etiketler,
                            state: true,
                            postOrder: TotalPosts,
                            sliderImages: [],
                            videoLink: "",
                            videoName: "",
                            manset: Record.mansetHaber,
                            mobile: false,
                            views: Views,
                            logs: [
                                {
                                    editor: "info@defensehere.com",
                                    editDate: Date.now(),
                                    editText: 'Post oluşturuldu'
                                }
                            ],
                            isDraft: Boolean(Record.aktif),
                            isLocked: Boolean(Record.locked)
                        })



                        await NewPost.save()
                        console.log("should be saved.")
                        console.log(AfterID)
                    });

                });

            });



        });
    });


}