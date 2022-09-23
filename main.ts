/**
 * Note: The variable "black_line" is used as a reference for the micro:bot to determine what it is driving on.
 */
input.onButtonPressed(Button.A, function () {
    black_line = pins.analogReadPin(AnalogPin.P1)
    serial.writeString("black_line_(i.e._Baseline_Value_of_Line_Following_Sensor_on_P1)=")
    serial.writeLine("" + (black_line))
})
let current_surface_reading = 0
let black_line = 0
serial.redirectToUSB()
motobit.invert(Motor.Left, true)
motobit.invert(Motor.Right, true)
black_line = pins.analogReadPin(AnalogPin.P1)
serial.writeString("black_line_(i.e._Baseline_Value_of_Line_Following_Sensor_on_P1)=")
serial.writeLine("" + (black_line))
/**
 * Note: If the line following sensor connected to P1 sees a black line, move backward and pivot to the left. We'll need to take a few more steps back to make sure that we do not get stuck in the same place. The reading can vary depending on the material that you are using for a black line. For black electrical tape, this is about ~800. 
 * 
 * It takes a few more seconds for the micro:bit to react when using the LED array and sending serial data. We'll want short delays so that there is enough time for the micro:bot to read the surface.
 */
/**
 * Note: This part of the code drives the micro:bot forward slowly if we do not see a black line.
 */
basic.forever(function () {
    current_surface_reading = pins.analogReadPin(AnalogPin.P1)
    serial.writeLine("" + (current_surface_reading))
    if (current_surface_reading >= black_line - 40) {
        motobit.enable(MotorPower.On)
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, 30)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 30)
        basic.showLeds(`
            . # . # .
            . # # # .
            # # # # #
            . # # # .
            . . # . .
            `)
        basic.pause(10)
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, 30)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 40)
        basic.showLeds(`
            # # # . .
            # # . . .
            # . # . .
            . . # . .
            . . # . .
            `)
        basic.pause(5)
        motobit.enable(MotorPower.Off)
    } else {
        motobit.enable(MotorPower.On)
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 40)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 40)
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        basic.pause(5)
        motobit.enable(MotorPower.Off)
    }
})
