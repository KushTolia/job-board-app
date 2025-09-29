<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'title' => $this->faker->jobTitle,
            'description' => $this->faker->paragraphs(3, true),
            'company' => $this->faker->company,
            'location' => $this->faker->city,
            'type' => $this->faker->randomElement(['Full-Time', 'Part-Time', 'Contract', 'Internship']),
            'apply_url' => $this->faker->url,
        ];
    }
}