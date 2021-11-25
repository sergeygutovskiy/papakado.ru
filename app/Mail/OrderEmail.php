<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderEmail extends Mailable
{
    use Queueable, SerializesModels;
    
    public $order;

    public function __construct($order)
    {  
        $this->order = $order;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->from( env('MAIL_FROM_ADDRESS') )
            ->subject('Новый заказ #' . $this->order->id)
            ->view('mail.order.created', [
                'order' => $this->order
            ]);
    }
}
