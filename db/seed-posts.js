// Generate Posts
require("dotenv/config")
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)

const Post = require("../models/Post.model")
const randomDate = require("../utils/randomDate")
const randomTime = require("../utils/randomTime")
const getRandom = require("../utils/getRandom")
const slugify = require("../utils/slugify")

const titles = [
    "5 Life-Changing Experiences In Berlin You Should Have Before You Die.",
    "Ten Things You Need To Know About Berlin Today.",
    "Ten Ugly Truth About Berlin.",
    "7 Benefits Of Berlin That May Change Your Perspective.",
    "The Truth About Berlin Is About To Be Revealed.",
    "Eliminate Your Fears And Doubts About Berlin.",
    "Five Ways To Introduce Berlin.",
    "Seven Things You Most Likely Didn't Know About Berlin.",
    "15 Secrets About Berlin That Nobody Will Tell You.",
    "Five Reasons Why You Should Go Berlin For Your Next Vacation.",
    "10 Facts You Never Knew About Berlin.",
    "What I Wish Everyone Knew About Berlin.",
    "Ten Berlin That Will Actually Make Your Life Better.",
    "7 Top Risks Of Berlin.",
    "Seven Tricks You Should Know When Travelling To Berlin.",
    "7 Ways Berlin Can Improve Your Business.",
    "Dining In Berlin: Here's What You Need To Know About The Food.",
    "5 Things You Probably Didn't Know About Berlin.",
    "5 Reasons Why People Love Berlin.",
    "Seven Things You Should Do In Berlin.",
    "Things That Make You Love And Hate Berlin.",
    "5 Beautiful Reasons We Can't Help But Fall In Love With Berlin.",
    "Five Reliable Sources To Learn About Berlin.",
    "The 10 Secrets That You Shouldn't Know About Berlin.",
    "Prevent Culture Shock! 15 Things You Should Know About Berlin And Their People!",
    "The History of Berlin.",
]

const categories = [
    "lifestyle",
    "weekend",
    "holidays",
    "city",
    "party",
    "music",
    "event",
    "art",
]

const tags = [
    "lifestyle",
    "weekend",
    "holidays",
    "city",
    "party",
    "music",
    "event",
    "art",
    "visit",
    "gallery",
    "opening",
]

const authors = [
    "61dd925feb0ede7582a79a92",
    "61dd925feb0ede7582a79a93",
    "61dd925feb0ede7582a79a94",
    "61dd925feb0ede7582a79a95",
    "61dd925feb0ede7582a79a96",
    "61dd925feb0ede7582a79a97",
]

const body =
    "<h2>Proin euismod dui justo</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. A porta urna placerat id. Pellentesque pharetra egestas dui a consequat. Nulla lacinia rhoncus sapien ornare porttitor. Fusce interdum pretium neque at pharetra. Etiam eleifend scelerisque nulla sit amet tempus. Vestibulum tortor orci, malesuada et dolor eu, volutpat sollicitudin nunc. Ut magna lacus, sagittis ut diam eget, accumsan viverra velit. Donec efficitur mauris neque, a fringilla odio imperdiet vitae.</p><p>Proin elementum diam quis nulla fringilla porttitor. Integer quam nisi, mattis at nunc a, ultricies sodales libero. Nulla laoreet sem id diam rutrum ultricies. Nulla elementum augue urna, id posuere risus volutpat ut. Phasellus blandit pharetra ex vitae efficitur. Phasellus molestie lacus quam, quis interdum est consequat non. Nulla in dictum purus. In id sodales elit, ac efficitur libero. Pellentesque ultricies lorem vitae maximus fermentum.</p><h2>Quisque id consectetur sem</h2><p>A pellentesque massa. Aliquam ut tristique enim. Sed vel convallis libero, a lacinia velit. Fusce ornare posuere tortor, sed tristique libero egestas in. Vestibulum mattis bibendum urna, eget ultrices neque pellentesque in. Suspendisse ut nulla nec lacus viverra tempus vel sit amet nibh. Nunc dictum purus a lectus pretium, ac feugiat leo finibus. Etiam rhoncus vel libero eu commodo. Quisque sodales fringilla turpis, at cursus velit hendrerit vel.</p><h3>Cras condimentum eros ac neque feugiat</h3><p>Et tristique nisl dictum. Suspendisse vulputate pellentesque lobortis. Morbi imperdiet magna interdum, pretium turpis et, pellentesque enim. Duis condimentum ipsum quam, quis euismod libero tristique quis. Praesent vestibulum sollicitudin ornare. Donec a varius ex. Proin enim magna, aliquet id libero quis, tempor consectetur elit. Ut varius non lorem auctor lacinia. Cras sodales mauris ante, in bibendum erat commodo ut. Praesent convallis, odio ut porttitor hendrerit, magna risus consectetur risus, a ullamcorper massa massa ultrices nisl. Nulla luctus purus a vulputate sodales. Praesent vestibulum elit quis dui sollicitudin sollicitudin. Vivamus turpis dui, imperdiet id ultrices at, lacinia et magna.</p><h3>Etiam molestie at lectus quis auctor.</h3><p>Phasellus dictum risus a est auctor, eu placerat augue efficitur. Sed nec justo ac sapien posuere tristique ac non ante. Ut nisl elit, interdum at laoreet sed, aliquet non ex. Aliquam aliquam nisi at sapien consequat tincidunt. In eu justo ac ex tincidunt pretium. Etiam odio massa, porta in ante vitae, bibendum efficitur dolor.</p><h3>Aliquam euismod ante vitae libero mollis</h3><p>Aliquam non suscipit justo. Aenean posuere ex id mauris suscipit, in porta elit congue. Maecenas lacus nunc, sodales sit amet lorem sed, eleifend pharetra quam. Suspendisse leo dolor, mollis vel dapibus non, mattis vel ligula. Quisque porta commodo tellus, in lobortis tortor rhoncus sit amet. Aliquam posuere augue egestas, accumsan tellus eget, scelerisque purus. Praesent nec blandit leo. Suspendisse a metus velit. Integer feugiat, ligula at ornare tempor, massa mauris cursus orci, nec lacinia lorem leo ut quam. In accumsan risus eros, nec pellentesque dui dictum sed. Aliquam porta viverra ante, fringilla aliquet eros molestie volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In et cursus dui, a mattis tellus. Suspendisse elit orci, pulvinar et sapien non, pellentesque malesuada libero. Nunc in lectus lorem.</p><h2>Nunc varius eros</h2><p>Sed nisi commodo eleifend. Vestibulum eros lectus, elementum eget efficitur at, ultrices eu dui. In dictum neque non mauris viverra rutrum. Aliquam fermentum mauris eget nibh fermentum iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis et lobortis nisl. Cras ullamcorper vel eros sed interdum. Suspendisse eros massa, sollicitudin a molestie non, egestas non lectus. Proin sollicitudin ut augue et gravida. Phasellus a nunc quis nunc iaculis dignissim quis vitae ante.</p><p>Nunc a risus in elit efficitur volutpat vitae consequat massa. Morbi odio ex, aliquam vitae gravida et, lobortis mollis turpis. Aenean egestas non velit id eleifend. Quisque finibus tincidunt posuere. Cras rhoncus varius ex sit amet blandit. Duis pharetra nisi in condimentum congue. Donec a consectetur sem, nec congue tortor. Etiam nec felis ligula. Integer lacinia dolor eget iaculis dignissim. Aliquam sagittis ex lorem, fringilla vestibulum nunc pellentesque in. In tristique, arcu in pharetra iaculis, mi nisi ultricies risus, eu malesuada nisl tellus pellentesque orci. Mauris vel pretium mi. Sed ante felis, egestas sit amet vehicula et, egestas non felis. Proin ipsum est, auctor vel suscipit eget, blandit nec mauris.</p><h2>Pellentesque fermentum</h2><p>Sodales risus, nec cursus lacus mollis eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed purus tellus, tincidunt in sapien ac, aliquet blandit sem. Ut et molestie felis. Nam et ex id metus laoreet pretium. Nam sed egestas ipsum. Etiam non hendrerit urna. Pellentesque eu nulla enim. Nunc ut ipsum dolor. In a neque tortor. Mauris et lacus sed turpis laoreet luctus. In sed nibh risus.</p><p>Proin congue tristique odio, sit amet accumsan lacus sodales vel. Proin mattis tempus purus a viverra. Ut nisi odio, lobortis eget consequat vel, varius quis elit. Quisque quis aliquam lectus. Ut sollicitudin lectus sed lectus scelerisque, eu vestibulum massa interdum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque accumsan tortor vitae euismod efficitur. Vivamus ac congue elit, id lobortis erat. Phasellus tincidunt rhoncus porta. Nulla facilisi. Pellentesque at dignissim risus. Proin porta, nisi pulvinar faucibus mollis, sem augue pretium magna, eu pellentesque sapien dolor eget est.</p>"

const covers = [
    "https://images.unsplash.com/photo-1517933029403-91a9781f7d77?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eXx8fHx8fDE2NDE4NTIwMzA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1520264834865-7effb972c224?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjA1NQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1603753887922-2cb9a77629cf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjA2MQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1567559445697-92697e8edda5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjA3MA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1577746134980-9e25ad4639f2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjA4MA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1561113276-11b5e029c4ca?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjA5MA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1612952547537-ac7176a8f2cb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjEwMQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1559564505-cc2d3af84e16?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjExMg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjEyNA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1551036093-005218bacd76?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjEzMw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1583799017856-7b1d93aa56fe?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjE0Mg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1549569344-5fab90429fd9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjE1MQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1573042582735-30d909e4735a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjE2MQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1533680325085-c05653cb9d50?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjE3MA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1551510438-c2dbb355cc6f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjE3Nw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1490684120840-1459ffb779c2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjE4Mw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1552035499-459b682e460d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjE5Nw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1569404225992-9ac478f3c14e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjIwMw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1622644144312-4dd22ec9505f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjIxMw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1527859279917-153064e7e4e5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjIyMQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1557996047-23d8d1162928?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjIyOQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1593684042048-e1c9fbfa15d0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjIzNw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1530398231547-70832467b336?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjI0Ng&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1587330979470-3595ac045ab0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjI1NQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1535812077244-dccbb8da42f5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjI3MQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1625685218928-84b31dc343fa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY0MTg1MjI4OA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
]

const metaDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel lacus viverra, aliquam eros sed, accumsan purus. Aliquam urna dolor, hendrerit."

// title
// date
// time
// category
// tags
// slug
// draft
// author
// body
// imageUrl

let fakePosts = []

for (let i = 0; i < titles.length; i++) {
    fakePosts.push({
        title: titles[i],
        date: randomDate(),
        time: randomTime(),
        category: getRandom(categories),
        tags: [getRandom(tags), getRandom(tags), getRandom(tags)],
        slug: slugify(titles[i]),
        draft: false,
        author: getRandom(authors),
        body: body,
        imageUrl: covers[i],
        metaDescription,
    })
}

Post.insertMany(fakePosts)
    .then(posts => {
        console.log(`Success, ${posts.length} posts were added to the db`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
