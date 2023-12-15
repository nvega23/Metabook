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

    User.create!(
      username: 'jose',
      email: 'vega.jose@gmail.com',
      password: 'password'
    )

    User.create!(
      username: 'tonya',
      email: 'tonya.perez@gmail.com',
      password: 'password'
    )
    User.create!(
      username: 'hilario',
      email: 'will.hilario@gmail.com',
      password: 'password'
    )
    User.create!(
      username: 'louetta',
      email: 'piece.louetta@gmail.com',
      password: 'password'
    )
    User.create!(
      username: 'peter',
      email: 'griffin.peter@gmail.com',
      password: 'password'
    )

    # More users
    10.times do
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      })
    end

    post1 = Post.create!(body: " 🌉",users_id: 1)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/bridge.jpeg')
    response = Net::HTTP.get_response(url)
    post1.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post2 = Post.create!(body: "No words needed...",users_id: 1)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/church.jpeg')
    response = Net::HTTP.get_response(url)
    post2.photo.attach(io: StringIO.new(response.body), filename: "Church.jpeg")
    
    post3 = Post.create!(body: "Amazing creatures",users_id: 7)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/idean-azad-TOKbfHc1iOw-unsplash.jpg')
    response = Net::HTTP.get_response(url)
    post3.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post4 = Post.create!(body: "humble...",users_id: 7)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/travel.jpeg')
    response = Net::HTTP.get_response(url)
    post4.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post5 = Post.create!(body: "New York views!",users_id: 2)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/newyork.jpeg')
    response = Net::HTTP.get_response(url)
    post5.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post6 = Post.create!(body: "Cute Dog!",users_id: 6)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/cutedog.jpeg')
    response = Net::HTTP.get_response(url)
    post6.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post7 = Post.create!(body: "Devil z",users_id: 2)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/devilz.jpeg')
    response = Net::HTTP.get_response(url)
    post7.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post8 = Post.create!(body: "one persons trash is another mans gold",users_id: 2)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/oldz.jpeg')
    response = Net::HTTP.get_response(url)
    post8.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post9 = Post.create!(body: "this reminds me of my childhood",users_id: 6)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/horse.jpeg')
    response = Net::HTTP.get_response(url)
    post9.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post10 = Post.create!(body: "One piece!!!",users_id: 4)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/kiado.jpg')
    response = Net::HTTP.get_response(url)
    post10.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")

    post11 = Post.create!(body: "Where can I buy gokus jacket!?",users_id: 4)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/smilinggoku.webp')
    response = Net::HTTP.get_response(url)
    post11.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post12 = Post.create!(body: "Trust yourself that you can do it and get it.",users_id: 5)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/soccerstadium.jpeg')
    response = Net::HTTP.get_response(url)
    post12.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post13 = Post.create!(body: "If you can dream it, you can do it",users_id: 5)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/soccerball.jpeg')
    response = Net::HTTP.get_response(url)
    post13.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post14 = Post.create!(body: "My love for Mexico still remains",users_id: 3)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/jose1.jpeg')
    response = Net::HTTP.get_response(url)
    post14.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post15 = Post.create!(body: "It's Beautiful",users_id: 3)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/jose2.jpeg')
    response = Net::HTTP.get_response(url)
    post15.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post16 = Post.create!(body: "My Culture",users_id: 3)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/jose3.jpeg')
    response = Net::HTTP.get_response(url)
    post16.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post17 = Post.create!(body: "perfect view",users_id: 2)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/newyorkflyover.jpeg')
    response = Net::HTTP.get_response(url)
    post17.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")
    
    post18 = Post.create!(body: "My New Funko Pop!",users_id: 2)
    url = URI.parse('https://nestors-demo-seed.s3.us-west-1.amazonaws.com/images/gokusleeping.jpeg')
    response = Net::HTTP.get_response(url)
    post18.photo.attach(io: StringIO.new(response.body), filename: "bridge.jpeg")

    comment1 = Comment.create!(post_id: 5, users_id: 2, body: "nice shot!")
    comment1 = Comment.create!(post_id: 18, users_id: 3, body: "He looks so relaxed!")
    comment1 = Comment.create!(post_id: 14, users_id: 2, body: "We need to go back sometime!")
    comment1 = Comment.create!(post_id: 11, users_id: 5, body: "Please lmk if you find it")

    puts "Done!"
# end
