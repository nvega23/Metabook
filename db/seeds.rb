# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# ApplicationRecord.transaction do
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Like.destroy_all
    Comment.destroy_all
    Post.destroy_all
    User.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    #makes id start at 1 again, otherwise it will continue
    ApplicationRecord.connection.reset_pk_sequence!('posts')
    ApplicationRecord.connection.reset_pk_sequence!('comments')
    ApplicationRecord.connection.reset_pk_sequence!('likes')

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo',
      email: 'demo@user.io',
      password: 'password'
    )
    User.create!(
      username: 'nestor',
      email: 'vega.nestor1@gmail.com',
      password: 'nestor'
    )

    # More users
    10.times do
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      })
    end


    post2 = Post.create!(body: "Moon.",users_id: 1)
    post2.photo.attach(io: URI.open('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/moon.jpeg'),
    filename: "moon.jpeg'")

    post3 = Post.create!(body: "Nice views!! 😎",users_id: 1)
    post3.photo.attach(io: URI.open('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/italy.jpg'),
    filename: "italy.jpg")

    post4 = Post.create!(body: " 🌉",users_id: 1)
    post4.photo.attach(io: URI.open('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/bridge.jpeg'),
    filename: "bridge.jpeg")

    post5 = Post.create!(body: "No words needed...",users_id: 1)
    post5.photo.attach(io: URI.open('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/church.jpeg'),
    filename: "church.jpeg")

    # post7 = Post.create!(body: "2D :D",users_id: 1)
    # post7.photo.attach(io: URI.open('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/2d.jpeg'),
    # filename: "2d.jpeg")

    post8 = Post.create!(body: "Oakland cares more about giving out tickets than real crime",users_id: 2)
    post8.photo.attach(io: URI.open('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/oaklandticket.jpeg'),
    filename: "oaklandticket.jpeg")

    post9 = Post.create!(body: "Peace",users_id: 1)
    post9.photo.attach(io: URI.open('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/religion.jpeg'),
    filename: "religion.jpeg")

    post10 = Post.create!(body: "perfect view",users_id: 2)
    post10.photo.attach(io: URI.open('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/waterfall.jpeg'),
    filename: "waterfall.jpeg")

    post11 = Post.create!(body: "rate my setup",users_id: 1)
    post11.photo.attach(io: URI.open('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/deskSetUp.jpeg'),
    filename: "waterfall.jpeg")

    post12 = Post.create!(body: "New York views!",users_id: 1)
    post12.photo.attach(io: URI.open('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/newyork.jpeg'),
    filename: "newyork.jpeg")

    comment1 = Comment.create!(post_id: 9, users_id: 2, body: "nice shot!")

    puts "Done!"

# end
# post5 = Post.create!(body: "No words needed...",users_id: 2)
# post5.photo.attach(io: URI.open(''),
# filename: "eldenring.jpeg")
