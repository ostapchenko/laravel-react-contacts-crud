<?php

namespace App\Events;

use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ContactUpdatedEvent extends AbstractContactEvent implements ShouldBroadcast {}
